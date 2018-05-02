// 模式 对数据字段进行定义

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema = new mongoose.Schema({
    name: String,
    movies: [{
        type: ObjectId,
        ref: 'movie',
    }],
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    },
})

// 存数据之前调用
CategorySchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
})

// 模式的静态方法 需要模型编译起效
CategorySchema.statics = {
    fetch: function(cb) {
        return this.find({}, cb)
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}, cb);
    }
}

module.exports = CategorySchema; // 导出模式