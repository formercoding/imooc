let Movie = require('../models/movie');
let _ = require('underscore');

exports.update = (req, res) => {
    var id = req.params.id;

    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: 'imooc 后台更新页',
                movie: movie,
            })
        })
    }
}
exports.list = (req, res) => {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }

        res.render('list', {
            title: 'imooc 列表页',
            movies: movies
        })
    })
}
exports.movie = (req, res) => {
    var id = req.params.id;

    Movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: 'imooc' + movie.title,
            movie: movie
        })
    });
}
exports.signup = (req, res) => {
    
}
exports.adminmovie = (req, res) => {
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
}
exports.new = (req, res) => {
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
}
exports.adminlist = (req, res) => {
    var id = req.query.id;

    if (id) {
        Movie.remove({ _id: id }, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: 1 })
            }
        })
    }
}




