var mysql = require('mysql');
var config = require('../config/default.js')
const fs = require('fs')

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});

/*
 * 封装query请求
 * method：请求方式（get/post/patch/put）
 * params：Object，字段名、表名称
 * option：
 * callback：回调函数，对数据进行处理
 */
function query(method, params, options, callback) {
  
  params.select = params.select ? params.select: '*'

  return new Promise((resolve, reject) => {
    pool.query(`SELECT ${params.select} from ${params.tableName}`, function(error, results, fields) {
      if(error) {
        console.log('err:' + error)
        fs.exists('../log', function(err) {     //bug 日志模块，待封装
          if(err) {
            console.log(err)
            fs.mkdir('../log')
          }
        })

        throw(error)
      } else {
        resolve(results)
      }
    })
  })
}

class Mysql {
  constructor() {

  }

  getUser() {
    return query('GET', {
      'tableName': 'user'
    }, function() {
      
    })
  }
}

module.exports = new Mysql()