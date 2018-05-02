// 模型 对传入的模式进行编译 生成构造函数
var mongoose = require('mongoose');
var CategorySchema = require('../schemas/category');
var Category = mongoose.model('category', CategorySchema, 'category'); // 通过模型生成构造函数

module.exports = Category; // 导出构造函数// 模型 对传入的模式进行编译 生成构造函数
