// 模型 对传入的模式进行编译 生成构造函数
var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment');
var Comment = mongoose.model('comment', CommentSchema, 'comment'); // 通过模型生成构造函数

module.exports = Comment; // 导出构造函数