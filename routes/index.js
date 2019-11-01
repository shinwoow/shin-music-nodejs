const mysql = require('../mysql')
const Router = require('koa-router')

//实例化路由， 拼接到api路径下，restful规范
const router = new Router({
  prefix: '/api'
});

router.get('/hellow/:name', async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`
});


//获取用户信息
router.get('/user', async (ctx, next) => {
  let data = await mysql.getUser()
  ctx.add
  ctx.body = {
    "code": 1,
    "data": data,
    "mesg": 'ok'
  }
  next()
})

//导出router
module.exports = router