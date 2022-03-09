const Order = require('../model/order.model');


class OrderService {
  async createOrder(order) {
    console.log(order);
    return await Order.create(order);
  }

  async findAllOrder(pageNum, pageSize, status) {
    // 获取总数
    const count = await Order.count({ deleted: false });
    // 设置分页查找参数
    const start = (pageNum - 1) * pageSize;
    const res = await Order.find({ deleted: false, status }).skip(start).limit(pageSize);
    return {
      pageNum,
      pageSize,
      total: count,
      list: res,
    }
  }

  async updateOrder(id, status) {
    return await Order.updateOne({ "_id": id }, { status });
  }
}

module.exports = new OrderService();