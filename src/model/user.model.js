const Schema = require('../db');
const mongoose = require('mongoose');
// 创建用户模型
const userSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
    required: true,
  }
})

var userModle = mongoose.model('users', userSchema);
// 导出数据表
module.exports = userModle;