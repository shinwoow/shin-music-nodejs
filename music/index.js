const fs = require('fs')
const base = require('../config/default')

const basePath = base.musicPath

let musicList = []
const musicTest = /\.[m][p]3$/

fs.readdir(basePath, function (err, data) {
  if (err) {
    console.log(err)
  } else {
    data.reduce(function (total, item) {
      if (musicTest.test(item)) {
        musicList.push(item)
      }
    }, [])
  }
})

module.exports = musicTest