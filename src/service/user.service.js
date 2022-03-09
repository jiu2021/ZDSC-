const User = require('../model/user.model');

class UserService {
  async creatUser(user_name, password) {
    const res = await User.create({ user_name, password });
    return res;
  }

  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne(whereOpt).exec();
    return res ? res : null;
  }

  async updateById({ id, user_name, password }) {
    const whereOpt = { id, user_name };

    const res = await User.updateOne(whereOpt, { "password": password });
    return res;
  }
}

module.exports = new UserService();