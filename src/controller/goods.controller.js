const path = require('path');

const {
  noFileError,
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
  invalidGoodsId,
  removeGoodsError,
  restoreGoodsError,
  getGoodsListError
} = require('../constant/err.type');
const { createGoods, updateGoods, removeGoods, softDeleteGoods, restoreGoods, findGoods } = require('../service/goods.service')

class GoodsController {
  async upload(ctx) {
    const fileTypes = ['image/jpg', 'image/png'];
    if (!ctx.request.files) {
      console.error('未检测到上传文件');
      return ctx.app.emit('error', noFileError, ctx);
    }
    const { file } = ctx.request.files;
    if (file) {
      if (!fileTypes.includes(file.type)) {

        console.error('文件格式不支持');
        return ctx.app.emit('error', unSupportedFileType, ctx);
      } else {
        ctx.body = {
          code: 0,
          message: '商品图片上传成功',
          result: {
            goods_img: path.basename(file.path)
          },
        }
      }
    } else {
      console.error('图片上传出错');
      return ctx.app.emit('error', fileUploadError, ctx);
    }
  }

  async create(ctx) {
    // 直接调用service的createGoods方法
    try {
      const res = await createGoods(ctx.request.body);
      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result: res
      }
    } catch (err) {
      console.error('发布商品出错', err);
      return ctx.app.emit('error', publishGoodsError, ctx);
    }
  }

  async update(ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if (res.matchedCount) {
        ctx.body = {
          code: 0,
          message: '修改商品成功',
          result: res,
        }
      } else {
        console.error('无效的商品ID');
        return ctx.app.emit('error', invalidGoodsId, ctx);
      }
    } catch (err) {
      console.error('无效的商品ID');
      return ctx.app.emit('error', invalidGoodsId, ctx);
    }
  }

  async remove(ctx) {
    try {
      const res = await removeGoods(ctx.params.id);
      if (res.matchedCount) {
        ctx.body = {
          code: 0,
          message: '删除商品成功',
          result: ''
        }
      } else {
        console.error('删除商品失败');
      }
    } catch (err) {
      console.error('删除商品失败', err);
    }
  }

  async softDelete(ctx) {
    try {
      const res = await softDeleteGoods(ctx.params.id);
      if (res.matchedCount) {
        ctx.body = {
          code: 0,
          message: '商品下架成功',
          result: res,
        }
      } else {
        console.error('商品下架失败');
        return ctx.app.emit('error', removeGoodsError, ctx);
      }
    } catch (err) {
      console.error('商品下架失败');
      return ctx.app.emit('error', removeGoodsError, ctx);
    }
  }

  async restore(ctx) {
    try {
      const res = await restoreGoods(ctx.params.id);
      console.log(res);
      if (res.matchedCount) {
        ctx.body = {
          code: 0,
          message: '商品上架成功',
          result: res,
        }
      } else {
        console.error('商品上架失败');
        return ctx.app.emit('error', restoreGoodsError, ctx);
      }
    } catch (err) {
      console.error('商品上架失败');
      return ctx.app.emit('error', restoreGoodsError, ctx);
    }
  }

  async findAll(ctx) {
    // 解析pageNum,pageSize
    const { pageSize = 10, pageNum = 1 } = ctx.request.query;
    try {
      // 调用数据处理方法
      const res = await findGoods(pageSize, pageNum);
      // 返回结果
      ctx.body = {
        code: 0,
        message: '获取商品列表成功',
        result: res
      }
    } catch (err) {
      console.error('获取商品列表失败');
      return ctx.app.emit('error', getGoodsListError, ctx);
    }

  }
}

module.exports = new GoodsController();