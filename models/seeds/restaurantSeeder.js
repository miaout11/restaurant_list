const Restaurant = require('../restaurant')
const db = require('../../config/mongoose') // 取得 db 執行 mongoose.js
const restaurantList = require('../../restaurant.json').results // 載入餐廳資料

db.once('open', () => {
    console.log('restaurantSeeder connected!')
    Restaurant.create(restaurantList)
    console.log('done.')
})
