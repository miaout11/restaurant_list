const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入model
const restaurantList = require('../../restaurant.json').results // 載入list資料

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 連線到mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection
db.on('error', () => {
    console.log('mongode error')
})
db.once('open', () => {
    console.log('restaurantSeeder connected!')
    Restaurant.create(restaurantList)
    console.log('done.')
})
