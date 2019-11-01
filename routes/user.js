const Router = require('koa-router')

//实例化路由， 拼接到api路径下，restful规范
const router = new Router({
  prefix: '/api/user'
});

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
