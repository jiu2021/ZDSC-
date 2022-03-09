const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const Schema = require('../db');

// 创建用户模型
const goodsSchema = new Schema({
  goods_name: {
    type: String,
    required: true,
  },
  goods_price: {
    type: Number,
    required: true,
  },
  goods_num: {
    type: Number,
    required: true,
  },
  goods_img: {
    type: String,
    required: true,
  }
})

//添加软删除插件
goodsSchema.plugin(mongoose_delete);

var goodsModle = mongoose.model('goods', goodsSchema);
// 导出数据模型
module.exports = goodsModle;