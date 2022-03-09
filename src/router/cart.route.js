const Router = require('koa-router');

const { auth } = require('../middleware/auth.middleware');
const { validator } = require('../middleware/cart.middleware');

const { add, findAll, update, remove, selectAll, selectNone } = require('../controller/cart.controller')

const router = new Router({ prefix: '/carts' });

// 添加到购物车
router.post('/', auth, validator({ goods_id: 'string' }), add);

// 获取购物车列表
router.get('/', auth, findAll);

// 更新购物车
router.patch('/:id', auth, validator({
  number: { type: 'number', require: false },
  selected: { type: 'bool', require: false },
}), update);

// 删除购物车
router.delete('/', auth, validator({ id: 'string' }), remove);

// 全选
router.post('/selectAll', auth, selectAll);

// 全不选
router.post('/selectNone', auth, selectNone);


module.exports = router;