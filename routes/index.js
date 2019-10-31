const mysql = require('../mysql')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')

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

//获取用户信息
router.get('/music', async (ctx, next) => {
  let data = await mysql.getMusicList()
  ctx.add
  ctx.body = {
    "code": 1,
    "data": data,
    "mesg": 'ok'
  }
  next()
})


// 定义文件上传路由
router.post('/uploadFilds', async (ctx, next) => {

  const files = ctx.request.files.file;

  let uploading = function (file) {
    // 创建可读流
    const reader = fs.createReadStream(file.path);

    let targetPath = path.join(__dirname, '../uploads/') + `/${file.name}`;
    //创建可写流
    const upStream = fs.createWriteStream(targetPath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  }
  let count = 0;
  if (files.length) {
    files.forEach(file => {
      uploading(file);
      count++;
    });
  } else {
    uploading(files);
    count = 1;
  }

  //返回上传结果
  return ctx.body = {
    code: 200,
    data: {
      msg: `共上传文件:${
        files.length
      }个，上传成功${count}个`
    }
  };
})

//导出router
module.exports = router