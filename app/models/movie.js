var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('movie', MovieSchema, 'imooc'); // 通过模型生成构造函数

module.exports = Movie; // 导出构造函数