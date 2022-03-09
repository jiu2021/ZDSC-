const { createOrder, findAllOrder, updateOrder } = require('../service/order.service');
const { createOrderError, findAllOrderError, updateOrderError } = require('../constant/err.type');

class OrderController {
  async create(ctx) {
    const user_id = ctx.state.user._doc._id;
    const { address_id, goods_info, total } = ctx.request.body;
    const order_number = 'XZD' + Date.now();
    const status = 0;
    try {
      const res = await createOrder({ user_id, address_id, goods_info, total, order_number, status });
      console.log(res);
      ctx.body = {
        code: 0,
        message: '成功生成订单',
        result: ''
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', createOrderError, ctx);
    }
  }

  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10, status = 0 } = ctx.request.query
    try {
      const res = await findAllOrder(pageNum, pageSize, status)
      ctx.body = {
        code: 0,
        message: '获取订单列表成功',
        result: res,
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', findAllOrderError, ctx);
    }
  }

  async update(ctx) {
    const id = ctx.request.params.id
    const { status } = ctx.request.body
    try {
      const res = await updateOrder(id, status)
      ctx.body = {
        code: 0,
        message: '更新订单状态成功',
        result: res,
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', updateOrderError, ctx);
    }
  }
}

module.exports = new OrderController();