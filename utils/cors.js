const cors = require('koa-cors')
const convert = require('koa-convert')//提供koa3.0 middleware支持

module.exports = convert(cors({
  origin: function (ctx) {
    if (ctx.url === '/api') {
      return "*"; // 允许来自所有域名请求
    }
    // return 'http://127.0.0.1:7777';
    return "*";
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'], //设置允许的HTTP请求类型
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


