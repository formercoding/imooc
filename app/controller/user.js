let User = require('../models/user');

// signup
exports.signup = (req, res) => {
    var _user = req.body.user;

    User.find({ name: _user.name }, (err, user) => {
        if (err) {
            console.log(err)
        }

        if (user) {
            return res.redirect('/');
        } else {
            var user = new User(_user);

            user.save((err, user) => {
                if (err) {
                    console.loga(err);
                }

                res.redirect('/admin/userlist')
            })
        }
    })
}

// userlist page
exports.userlist = (req, res) => {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err)
        }

        res.render('userlist', {
            title: 'imooc 用户列表页',
            users,
        })
    })
}

// signin
exports.signin = (req, res) => {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('index', {
            title: 'imooc 首页',
            movies: movies
        })
    })
}

// logout
exports.logout = (req, res) => {
    delete req.session.user;
    // delete app.locals.user;
}