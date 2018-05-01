// 模型 对传入的模式进行编译 生成构造函数
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('imooc', MovieSchema, 'imooc'); // 通过模型生成构造函数

module.exports = Movie; // 导出构造函数// 模型 对传入的模式进行编译 生成构造函数
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('imooc', MovieSchema, 'imooc'); // 通过模型生成构造函数

module.exports = Movie; // 导出构造函数