const { createAddr, findAllAddress, updateAddress, removeAddress } = require('../service/addr.service');

const { addAddressError, findAllAddressError, updateAddressError, removeAddressError } = require('../constant/err.type');
const app = require('../app');
const { context } = require('../app');

class AddrController {
  async create(ctx) {
    const user_id = ctx.state.user._doc._id;
    const { consignee, phone, address } = ctx.request.body;
    try {
      await createAddr({ user_id, consignee, phone, address });
      ctx.body = {
        code: 0,
        message: '获取地址成功',
        result: '',
      }
    } catch (err) {
      console.error(err);
      addAddressError.result = err;
      return ctx.app.emit('error', addAddressError, ctx);
    }
  }

  async findAll(ctx) {
    const user_id = ctx.state.user._doc._id;
    try {
      const res = await findAllAddress(user_id);
      ctx.body = {
        code: 0,
        message: '添加地址成功',
        result: res,
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', findAllAddressError, ctx);
    }
  }

  async update(ctx) {
    const id = ctx.request.params.id;
    const newAddr = ctx.request.body;
    try {
      const res = await updateAddress(id, newAddr);
      if (res.matchedCount) {
        ctx.body = {
          code: 0,
          message: '更新地址成功',
          result: '',
        }
      } else {
        return ctx.app.emit('error', updateAddressError, ctx);
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', updateAddressError, ctx);
    }
  }

  async remove(ctx) {
    const id = ctx.request.params.id;
    try {
      const res = await removeAddress(id);
      ctx.body = {
        code: 0,
        message: '删除地址成功',
        result: res,
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', removeAddressError, ctx);
    }
  }
}

module.exports = new AddrController();