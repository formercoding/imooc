let Movie = require('../models/movie');
let Category = require('../models/category');
let _ = require('underscore');

exports.new = (req, res) => {
    res.render('categoryAdmin', {
        title: 'imooc 后台分类录入页',
        category: {}
    })
}


exports.save = (req, res) => {
    var _category = req.body.category;

    var category = new Category(_category);

    category.save((err, category) => {
        if(err) {
            console.log(err);
        }

        res.redirect('/admin/category/list');
    })
}

exports.list = (req, res) => {
    Category.fetch((err, categories) => {
        if(err) {
            console.log(err);
        }

        res.render('categorylist', {
            title: 'imooc 分类列表页',
            categories
        })
    })
}




