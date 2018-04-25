// 模型 对传入的模式进行编译 生成构造函数
var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model('imooc', UserSchema, 'imooc'); // 通过模型生成构造函数

module.exports = User; // 导出构造函数