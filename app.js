const Koa = require('koa')
const config = require('./config/default')
const mysql = require('./mysql')
const config = require('./src/config/default')
const router = require('./src/router') //导入router

const app = new Koa()

//解析request的body
app.use(bodyParser())

//打印当前访问路由
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

console.log((new Date()).toString().split(' ').slice(0, 4).join(' '))

//启用router中间件
app.use(router.routes())

//跨域设置cors
app.use(cors)

//添加错误事件侦听器
// app.on('error', (err, ctx) => {
//   log.error('server error', err, ctx)
// });

app.listen(config.port)

console.log(`listening on port ${config.port}: http://127.0.0.1:3000`)