const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const Schema = require('../db');

// 创建用户模型
const cartSchema = new Schema({
  goods_id: {
    type: Schema.Types.ObjectId,
    ref: "goods",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  number: {
    type: Number,
    required: true,
    default: 1,
  },
  selected: {
    type: Boolean,
    required: true,
    default: true,
  }
})

//添加软删除插件
cartSchema.plugin(mongoose_delete);

var cartModle = mongoose.model('carts', cartSchema);
// 导出数据模型
module.exports = cartModle;