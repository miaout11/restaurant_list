const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const restaurantList = require('./restaurant.json').results // 載入餐廳種子資料

const seedUser = [
  {
    email: 'user1@example.com',
    password: '12345678',
    restaurantIndex: [0, 1, 2] // 擁有 #1, #2, #3 號餐廳
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    restaurantIndex: [3, 4, 5] // 擁有 #4, #5, #6 號餐廳
  }
]

db.once('open', () => {
  Promise.all(seedUser.map(seedUser =>
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        const seedRestaurant = seedUser.restaurantIndex.map(
          i => {
            restaurantList[i].userId = user._id
            return restaurantList[i]
          }
        )
        return Restaurant.create(seedRestaurant)
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
  ))
})
