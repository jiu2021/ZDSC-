const { context } = require("../app");
const app = require("../app");

const {
  addToCartError,
  getCartsListError,
  cartFormatError,
  cartUpdateError,
  removeCartsError,
  selectAllError,
  selectNoneError
} = require('../constant/err.type');
const { createOrUpdate, findCarts, updateCarts, removeCarts, selectAllCarts, selectNoCarts } = require('../service/cart.service');

class Cartcontroller {
  async add(ctx) {
    const user_id = ctx.state.user._doc._id;
    const goods_id = ctx.request.body.goods_id;
    try {
      const res = await createOrUpdate(user_id, goods_id);
      ctx.body = {
        code: 0,
        message: '添加购物车成功',
        result: res.goods_id
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', addToCartError, ctx);
    }
  }

  async findAll(ctx) {
    // 解析pageNum,pageSize
    const { pageSize = 10, pageNum = 1 } = ctx.request.query;
    try {
      // 调用数据处理方法
      const res = await findCarts(pageNum, pageSize);
      // 返回结果
      ctx.body = {
        code: 0,
        message: '获取商品列表成功',
        result: res,
      }
    } catch (err) {
      console.error('获取商品列表失败', err);
      return ctx.app.emit('error', getCartsListError, ctx);
    }
  }

  async update(ctx) {
    // 解析参数
    const { id } = ctx.request.params;
    const { number, selected } = ctx.request.body;

    if (number === undefined && selected === undefined) {
      cartFormatError.message = 'number和selected不能同时为空';
      return ctx.app.emit('error', cartFormatError, ctx);
    }
    try {
      const res = await updateCarts({ id, number, selected });
      ctx.body = {
        code: 0,
        message: '更新购物车成功',
        result: res
      };
    } catch (err) {
      console.error(err);
      cartUpdateError.result = err;
      return ctx.app.emit('error', cartUpdateError, ctx);
    }
  }

  async remove(ctx) {
    const { id } = ctx.request.body;
    try {
      const res = await removeCarts(id);
      ctx.body = {
        code: 0,
        message: '移除购物车成功',
        result: ''
      }
    } catch (err) {
      console.error(err);
      removeCartsError.result = err;
      return ctx.app.emit('error', removeCartsError, ctx);
    }
  }

  async selectAll(ctx) {
    const user_id = ctx.state.user._doc._id;
    try {
      const res = await selectAllCarts(user_id);
      if (res.matchedCount) {
        ctx.body = {
          code: 0,
          message: '全选成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', selectAllError, ctx);
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', selectAllError, ctx);
    }
  }

  async selectNone(ctx) {
    const user_id = ctx.state.user._doc._id;
    try {
      const res = await selectNoCarts(user_id);
      if (res.matchedCount) {
        ctx.body = {
          code: 0,
          message: '取消全选成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', selectNoneError, ctx);
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', selectNoneError, ctx);
    }
  }
}


module.exports = new Cartcontroller();