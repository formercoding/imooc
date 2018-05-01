var Index = require('../app/controller/index');
var Movie = require('../app/controller/movie');
var User = require('../app/controller/user');
var Comment = require('../app/controller/comment');
module.exports = (app) => {
    // pre handle user
    app.use((req, res, next) => {
        var _user = req.session.user;

        app.locals.user = _user;

        next();
    })

    // index
    app.get('/', Index.index);

    // movie
    app.get('/admin/update/:id', User.signinRequired, User.adminRequired, Movie.update);

    app.get('/admin/list', Movie.adminlist)

    app.get('/movie/:id', Movie.movie);

    app.get('/admin/movie', Movie.adminmovie);

    app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);



    app.delete('/admin/list', User.signinRequired, User.adminRequired, Movie.adminlist);

    // user
    app.post('/user/signup',User.signup);

    // userlist page
    app.get('/admin/userlist', User.signinRequired, User.adminRequired, User.userlist)

    // signin
    app.post('/user/signin', User.signin)

    app.get('/signin', User.showSignin);
    
    app.get('/signup', User.showSignup);

    // logout
    app.get('/logout', User.logout);

    // comment
    app.post('/user/comment', User.signinRequired, Comment.save);
}

