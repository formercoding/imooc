let Movie = require('../models/movie');
let Comment = require('../models/comment');
let Category = require('../models/category');
let _ = require('underscore');
var fs = require('fs');
var path = require('path')

exports.update = (req, res) => {
    var id = req.params.id;

    if (id) {
        Movie.findById(id, function (err, movie) {
            Category.find({}, (err, categories) => {
                res.render('admin', {
                    title: 'imooc 后台更新页',
                    movie: movie,
                    categories
                })
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
        Movie.update({_id: id}, {$inc: {pv: 1}}, (err) => {
            console.log(err)
        })
        Comment
            .find({movie: id})
            .populate('from', 'name')
            .populate('reply.from', 'name')
            .populate('reply.to', 'name')
            .exec(function(err, comments) {
                res.render('detail', {
                    title: 'imooc' + movie.title,
                    movie: movie,
                    comments: comments
                })
            })
    });
}

exports.adminmovie = (req, res) => {
    Category.find({}, (err, categories) => {
        res.render('admin', {
            title: 'imooc 录入页',
            categories: categories,
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
    
}

exports.savePoster = ((req, res, next) => {
    var posterData = req.files.uploadPoster;
    var filePath = posterData.path;
    var originalname = posterData.originalname;

    if(originalname) {
        fs.readFile(filePath, (err, data) => {
            var timestamp = Date.now();
            var type = posterData.mimetype.split('/')[1];
            var poster = timestamp + '.' + type;
            var newPath = path.join(__dirname, '../../', 'public/upload/', poster);
            fs.writeFile(newPath, data, (err) => {
                req.poster = poster;
                next();
            })
        })
    } else {
        next();
    }
})

exports.new = (req, res) => {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;

    movieObj.flash = 'http://video.699pic.com/videos/95/50/48/3r6HpJPt1Jid1525955049.mp4';
    var _movie;

    if(req.poster) {
        movieObj.poster = req.poster;
    }

    if (id) {
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
        _movie = new Movie(movieObj)

        let categoryId = _movie.category;
        let categoryName = movieObj.categoryName;

        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }

            if(categoryId) {
                Category.findById(categoryId, (err, category) => {
                    category.movies.push(movie._id);
    
                    category.save((err, category) => {
                        res.redirect('/movie/' + movie._id);
                    });
                })
            } else if(categoryName) {
                var category = new Category({
                    name: categoryName,
                    movies: [movie._id]
                });

                category.save((err, category) => {
                    _movie.category = category._id;
                    movie.save((err, movie) => {
                        res.redirect('/movie/' + movie._id);
                    })
                })
            }

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




