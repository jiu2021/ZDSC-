const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const { CHAR, DECIMAL, TINYINT, TEXT } = require('sequelize');

const Schema = require('../db');

// 创建用户模型
const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  address_id: {
    type: Schema.Types.ObjectId,
    ref: "address",
    required: true,
  },
  goods_info: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  order_number: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  }

})

//添加软删除插件
orderSchema.plugin(mongoose_delete);

var orderModle = mongoose.model('orders', orderSchema);
// 导出数据模型
module.exports = orderModle;