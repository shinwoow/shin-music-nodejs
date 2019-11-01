const mysql = require('mysql');
const config = require('../config/default.js')

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});

/**
 * @author shinwoow
 * @function 封装query请求
 * @param {String} method - 请求方式（get/post/patch/put）
 * @param {Object} params - Object，字段名、表名称
 * @param {Object} options - 
 * @param {Function} callback - 回调函数，对数据进行处理
 */
function query(method, params, options, callback) {

  params.select = params.select ? params.select : '*'

  return new Promise((resolve, reject) => {
    pool.query(`SELECT ${params.select} from ${params.tableName}`, function (error, results, fields) {
      if (error) {
        console.log('err:' + error)
        throw (error)
      } else {
        resolve(results)
      }
    })
  })
}

/**
 * 
 * @param {String} tableName -需要插入的数据表名
 * @param {Array} params  - 表内参数值
 * @param {Array} values - 需要插入的新值
 */
function insert(tableName, params, values) {
  let l = '?'
  let addMYSQL = `INSERT INTO ${tableName} (${params.join(',')}) VALUES (${l.repeat(params.length).split('').join(',')})`;
  console.log(addMYSQL)
  pool.query(addMYSQL, values, function (err, result) {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      return;
    }

    console.log('--------------------------INSERT----------------------------');
    console.log('INSERT ID:', result);
    console.log('-----------------------------------------------------------------\n\n');
  })
}

class Mysql {
  constructor() {

  }

  getUser() {
    return query('GET', {
      'tableName': 'user'
    }, function () {

    })
  }
  getMusicList() {
    return query('GET', {
      'tableName': 'music'
    }, function () {

    })
  }
  //将上传的文件信息保存到mysql
  insertMusic(values) {
    let date = new Date();
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate();
    return insert('music', ['music_name', 'music_path', 'create_date'], [values.name, values.path, Y + M + D])
  }
}




module.exports = new Mysql()