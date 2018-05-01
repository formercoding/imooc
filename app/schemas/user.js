// 模式 对数据字段进行定义

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
    role: {
        type: Number,
        default: 0
    },
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
UserSchema.pre('save', function(next) {
    var user = this;
    
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) {
            return next(err)
        }

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {
                console.log('has err 2')
                return next(err);
            }

            user.password = hash;
            next();
        })
    })
})

UserSchema.methods = {
    comparePassword: function(_password, cb) {
        bcrypt.compare(_password, this.password, (err, isMatch) => {
            if(err) {
                return cb(err);
            }
            
            cb(null, isMatch);
        })
    }
}

// 模式的静态方法 需要模型编译起效
UserSchema.statics = {
    fetch: function(cb) {
        return this.find({}, cb)
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}, cb);
    }
}

module.exports = UserSchema; // 导出模式