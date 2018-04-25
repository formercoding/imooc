var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')
var port = process.env.PORT || 3000;
var app = express();
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(express);

var moment = require('moment');
var dbUrl = 'mongodb://localhost/imooc';

mongoose.connect(dbUrl);

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(express.cookieParse())
app.use(express.session({
    secrect: 'imooc',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/', express.static('./node_modules'));
app.use('/public', express.static('./public'));
app.locals.moment = moment;

if('development' === app.get('env')) {
    app.set('showStackError', true);
    app.user(express.logger(':method :url :status'));
    mongoose.set('debug', true);
}


require('./config/routes')(app);

app.listen(port);

console.log('服务启动成功:' + port);

mongoose.connect('mongodb://localhost/imooc', function () {
    console.log('数据库连接成功');
});


