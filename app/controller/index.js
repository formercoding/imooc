let Movie = require('../models/movie');
var Category = require('../models/category')

exports.index = (req, res) => {
    Category.find({})
        .populate({path: 'movies', options: {limit: 5}})
        .exec((err, categories) => {
            if(err) {
                console.log(err);
            }
            console.log(categories)
            res.render('index', {
                title: 'imooc 首页',
                categories
            })
        })
}


exports.search = (req, res) => {
    var catId = req.query.cat;
    var page = parseInt(req.query.p) || 0;
    var index = page * 2;
    var q = req.query.q;

    if(catId) {

        Category.find({_id: catId})
            .populate({path: 'movies'})
            .exec((err, categories) => {
                if(err) {
                    console.log(err);
                }
                var category = categories[0] || {};
                var movies = category.movies || [];
                var results = movies.slice(index, index + 2);
                res.render('result', {
                    title: 'imooc 结果列表页面',
                    keyword: category.name,
                    currentPage: (page + 1),
                    totalPage: Math.ceil(movies.length / 2),
                    movies: results,
                    query: 'cat=' + catId,
                })
            })
    } else {
        Movie.find({
        title: new RegExp(q + '.*', 'i')
        }).exec((err, movies) => {
            if(err) {
                console.log(err)
            }

            var results = movies.slice(index, index + 2);
            res.render('result', {
                title: 'imooc 结果列表页面',
                keyword: q,
                currentPage: (page + 1),
                totalPage: Math.ceil(movies.length / 2),
                movies: results,
                query: 'q' + q,
            })
        })
    }
    
}