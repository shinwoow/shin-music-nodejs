/**
 * 解决mysql连接超时失败问题
 * **/
const mysql = require('mysql');
const config = require('../config/default.js')

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
})

//创建连接池，防止连接超时失败
var mysqlPool = function (sql, options, callback) {

  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.mysqlPool(sql, options, function (err, results, fields) {
        //事件驱动回调
        callback(err, results, fields);
      })
      //释放连接，需要注意的是连接释放需要在此处释放，而不是在查询回调里面释放
      conn.release()
    }
  })
}

module.exports = mysqlPool