// 模式 对数据字段进行定义

var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    language: String,
    country: String,
    flash: String,
    poster: String,
    year: Number,
    summary: String,
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
MovieSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
})

// 模式的静态方法 需要模型编译起效
MovieSchema.statics = {
    fetch: function(cb) {
        return this.find({}, cb)
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}, cb);
    }
}

module.exports = MovieSchema; // 导出模式