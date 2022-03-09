const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const Schema = require('../db');

// 创建用户模型
const addrSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  consignee: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    match: /^1\d{10}$/,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

})

//添加软删除插件
addrSchema.plugin(mongoose_delete);

var addrModle = mongoose.model('addresses', addrSchema);
// 导出数据模型
module.exports = addrModle;