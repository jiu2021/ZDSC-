const Cart = require('../model/cart.model');
const Goods = require('../model/goods.model');
const ObjectID = require('mongodb').ObjectId;

class CartService {
  async createOrUpdate(user_id, goods_id) {
    const res = await Cart.findOne({
      user_id,
      goods_id
    });
    if (res) {
      let { number } = res;
      // 购物车中已存在则number++
      return await Cart.findOneAndUpdate({
        user_id,
        goods_id
      }, { 'number': ++number });
    } else {
      // 购物车中不存在则添加至购物车
      return await Cart.create({
        user_id,
        goods_id
      });
    }

  }

  async findCarts(pageNum, pageSize) {
    // 获取总数
    const count = await Cart.count({ deleted: false });
    // 设置分页查找参数
    const start = (pageNum - 1) * pageSize;
    const res = await Cart.find({ deleted: false }).populate('goods_id').skip(start).limit(pageSize);

    return {
      pageNum,
      pageSize,
      total: count,
      list: res,
    }
  }

  async updateCarts(params) {
    const { id, number, selected } = params;

    const res = await Cart.findById(id);
    if (!res) {
      return '未找到购物车';
    } else {
      console.log(res);
      number !== undefined ? (res.number = number) : '';
      selected !== undefined ? (res.selected = selected) : '';
      return await Cart.updateOne({ '_id': id }, res);
    }
  }

  async removeCarts(id) {
    return await Cart.findOneAndRemove({ '_id': id });
  }

  async selectAllCarts(user_id) {
    return await Cart.updateMany({ user_id }, { "selected": true });
  }

  async selectNoCarts(user_id) {
    return await Cart.updateMany({ user_id }, { "selected": false });
  }
}

module.exports = new CartService();