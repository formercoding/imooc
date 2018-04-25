var Index = require('../app/contro;;ers/index');
var Movie = require('../app/contro;;ers/movie');
var User = require('../app/contro;;ers/user');
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
    app.get('/admin/update/:id', Movie.update);

    app.get('/admin/list', Movie.adminlist)

    app.get('/movie/:id', Movie.movie);

    app.get('/admin/movie', Movie.adminmovie);

    app.post('/admin/movie/new', Movie.new);



    app.delete('/admin/list', Movie.adminlist);

    // user
    app.post('/user/signup',User.signup);

    // userlist page
    app.get('/admin/userlist',User.userlist)

    // signin
    app.post('/user/signin', User.signin)

    // logout
    app.get('/logout', User.logout);
}

