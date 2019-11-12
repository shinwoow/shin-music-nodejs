const path = require('path')
const fs = require('fs')

function getDate() {
  let date = new Date();
  let Y = date.getFullYear();
  let M = date.getMonth() + 1;
  let D = date.getDate();

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  let day = Y + '-' + M + '-' + D;
  let time = h + ':' + m + ':' + s;

  return day + ',' + time;
}

/**
 * 抛出log对象
 */
class Log {
  constructor() {

  }

  warn(warn) {

  }

  error(err) {}

  success(req) {
    let date = getDate();
    console.log(date);

  }
}

module.exports = new Log();