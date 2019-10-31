// const path = require('path')
// const fs = require('fs')

// const uploadFile = (ctx) => {
//   let remotefilePath = null
//   console.log(ctx)
//   if (ctx.request.files['file']) {

//     //创建读取流
//     const reader = fs.createReadStream(ctx.request.files['file']['path']);
//     let filePath = `${path.resolve(__dirname, '../../public/file')}/${ctx.request.files['file']['path']}`;
//     remotefilePath = `http://127.0.0.1:3000/api/images/${ctx.request.files['file']['name']}`;

//     //创建可写流
//     const upstream = fs.createWriteStream(filePath);
//     //pipe写入
//     reader.pipe(upstream);

//   }
//   return remotefilePath;
// }

// module.exports = uploadFile;

class UploadFildsController {
  static async uploadFilds(ctx) {
    // 获取上传文件对象
    console.log(ctx.req);
    ctx.body = {
      code: 1
    }
  }
}
module.exports = UploadFildsController