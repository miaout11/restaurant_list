const mongoose = require('mongoose')

const MONGODB_PATH = process.env.MONGODB_PATH

// 設定連線到 mongoDB
mongoose.connect(MONGODB_PATH, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

// 取得資料庫連線狀態
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
