const Goods = require('../model/goods.model');

class GoodsService {
  async createGoods(goods) {
    return await Goods.create(goods);
  }

  async updateGoods(id, goods) {
    const res = await Goods.updateOne({ '_id': id }, goods);
    return res;
  }

  async removeGoods(id) {
    const res = await Goods.findOneAndRemove({ 'id': id });
    return res;
  }

  async softDeleteGoods(id) {
    // @ts-ignore
    /*Goods.deleteById(id, (err, petDocument) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log(petDocument);
        return true;
      }
    });*/
    // @ts-ignore
    const res = await Goods.deleteById({ '_id': id });
    return res;
  }

  async restoreGoods(id) {
    // @ts-ignore
    const res = await Goods.restore({ '_id': id });
    return res;
  }

  async findGoods(pageSize, pageNum) {
    // 获取总数
    const count = await Goods.count({ deleted: false });
    // 设置分页查找参数
    const start = (pageNum - 1) * pageSize;
    const res = await Goods.find({ deleted: false }).skip(start).limit(pageSize);

    return {
      pageNum,
      pageSize,
      total: count,
      list: res,
    }
  }

}


module.exports = new GoodsService();