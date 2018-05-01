let User = require('../models/user');

// signup
exports.signup = (req, res) => {
    var _user = req.body.user;

    User.find({ name: _user.name }, (err, user) => {
        if (err) {
            console.log(err)
        }

        if (user.length) {
            return res.redirect('/signup');
        } else {
            var user = new User(_user);

            user.save((err, user) => {
                if (err) {
                    console.loga(err);
                }

                res.redirect('/')
            })
        }
    })
}

// userlist page
exports.userlist = (req, res) => {
    User.fetch((err, users) => {
        if(err) {
            console.log(err);
        }

        res.render('userlist', {
            title: 'imooc 用户列表页',
            users
        })
    })
}

// signin
exports.signin = (req, res) => {
    var _user = req.body.user
    name = _user.name,
    password = _user.password;

    User.findOne({ name: name }, (err, user) => {
        if (err) {
            console.log(err)
        }

        if (!user) {
            return res.redirect('/signup');
        }

        user.comparePassword(password, (err, isMatch) => {
            if(err) {
                console.log(err)
            }

            if(isMatch) {
                req.session.user = user;

                return res.redirect('/');
            } else {
                return res.redirect('/signin')
            }
        })
    })
}

// logout
exports.logout = (req, res) => {
    delete req.session.user;
    // delete app.locals.user;

    res.redirect('/')
}

// signin
exports.showSignin = (req, res) => {
    res.render('signin', {
        title: '登录页面',
    })
}

// signup
exports.showSignup = (req, res) => {
    res.render('signup', {
        title: '注册页面',
    })
}

// midware for user
exports.signinRequired = (req, res, next) => {
    var user = req.session.user;

    if(!user) {
        return res.redirect('/signin')
    } 

    next();

}

exports.adminRequired = (req, res, next) => {
    var user = req.session.user;

    if(user.role < 10) {
        return res.redirect('/signin')
    }

    next();
};