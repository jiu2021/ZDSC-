const bcrypt = require('bcryptjs');
const { getUserInfo } = require('../service/user.service');
const { userFormatError, userAlreadyExisted, userRegisterError, userDoesNotExist, userLoginError, passwordError } = require('../constant/err.type');

const userValidator = async(ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body);
    ctx.app.emit('error', userFormatError, ctx);
    return
  }
  await next();
}

const verifyUser = async(ctx, next) => {
  const { user_name } = ctx.request.body;
  // 合理性
  try {
    // @ts-ignore
    const res = await getUserInfo({ user_name });
    if (res) {
      console.error('用户名已经存在', { user_name });
      ctx.app.emit('error', userAlreadyExisted, ctx);
      return
    }
  } catch (err) {
    console.error('获取用户信息错误', err);
    ctx.app.emit('error', userRegisterError, ctx);
    return
  }
  await next();
}

const cryptPassword = async(ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  // hash保存的是密文
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
}


const verifyLogin = async(ctx, next) => {
  const { user_name, password } = ctx.request.body;
  try {
    //判断用户是否存在
    // @ts-ignore
    const res = await getUserInfo({ user_name });
    if (!res) {
      console.error('用户不存在', { user_name });
      ctx.app.emit('error', userDoesNotExist, ctx);
      return
    }
    //密码是否匹配
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', passwordError, ctx);
      return
    }
  } catch (err) {
    console.error('获取用户信息错误', err);
    return ctx.app.emit('error', userLoginError, ctx);
  }


  await next();
}

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin
}