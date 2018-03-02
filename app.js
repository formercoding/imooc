var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')
var port = process.env.PORT || 3000;
var app = express();
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var moment = require('moment');
var _ = require('underscore')

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/', express.static('./node_modules'));
app.use('/public', express.static('./public'));
app.locals.moment = moment;

app.listen(port);

console.log('服务启动成功:' + port);

mongoose.connect('mongodb://localhost/imooc', function () {
    console.log('数据库连接成功');
});

app.get('/', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('index', {
            title: 'imooc 首页',
            movies: movies
        })
    })
})

app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id;

    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: 'imooc 后台更新页',
                movie: movie,
            })
        })
    }
});

app.get('/admin/list', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }

        res.render('list', {
            title: 'imooc 列表页',
            movies: movies
        })
    })
})

app.get('/movie/:id', function (req, res) {
    var id = req.params.id;

    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: 'imooc' + movie.title,
            movie: movie
        })
    });
})

app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: 'imooc 录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            language: '',
            summary: '',
            poster: '',
            falsh: ''
        }
    })
})

app.post('/admin/movie/new', function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    
    if (id !== 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err)
            }
            _movie = new Movie(_.extend(movie, movieObj));

            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }

                res.redirect('/movie/' + movie._id);
            })
        })
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash,
        })  

        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }

            res.redirect('/movie/' + movie._id);
        })
    }
})

app.delete('/admin/list', function(req, res) {
    var id = req.query.id;

    if(id) {
        Movie.remove({_id: id}, function(err, movie) {
            if(err) {
                console.log(err);
            } else {
                res.json({success: 1})
            }
        })
    }
})