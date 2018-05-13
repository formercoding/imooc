var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var logger = require('morgan')
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var multer = require('multer');

var moment = require('moment');
var app = express();

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
//这里传入了一个密钥加session id
app.use(cookieParser('User'));
//使用就靠这个中间件
app.use(session({ 
    secret: 'user',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        url: 'mongodb://localhost/imooc',
        collection: 'sessions'
    }) 
}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/', express.static('./node_modules'));
app.use('/public', express.static('./public'));
app.use(multer());
app.locals.moment = moment;

if('development' === app.get('env')) {
    app.set('showStackError', true);
    app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

// app.use(session({
//     secret: 'user',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }))

require('./config/routes')(app);

app.listen(port);

console.log('服务启动成功:' + port);

mongoose.connect('mongodb://localhost/imooc', function () {
    console.log('数据库连接成功');
});

