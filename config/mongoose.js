const mongoose = require('mongoose')
// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_PATH, { useNewUrlParser: true, useUnifiedTopology: true }) // 連線到mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection

db.on('error', () => {
  console.log('mongode error')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db // 匯出資料庫連線狀態 db
