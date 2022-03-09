const Address = require('../model/addr.model');
class AddrService {
  async createAddr(addr) {
    return await Address.create(addr);
  }

  async findAllAddress(user_id) {
    return await Address.find({ user_id });
  }

  async updateAddress(id, newAddr) {
    return await Address.updateOne({ '_id': id }, newAddr);
  }

  async removeAddress(id) {
    return await Address.findByIdAndDelete({ '_id': id });
  }
}

module.exports = new AddrService();