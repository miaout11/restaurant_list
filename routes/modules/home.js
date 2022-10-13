const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sortSelector = require('../../utility/sortSelector')

// 定義首頁路由
router.get('/', (req, res) => {
  const sort = req.query.sort
  const home = true
  Restaurant.find({})
    .lean()
    .sort(sortSelector(sort))
    .then(restaurants => res.render('index', { restaurants, home }))
    .catch(error => console.error(error))
})

// search function
router.get('/search', (req, res) => {
  const keywords = req.query.keywords
  const keyword = keywords.trim().toLowerCase()

  if (!keywords) {
    return res.redirect('/')
  }

  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(
        list =>
          list.name.toLowerCase().includes(keyword) || list.category.includes(keyword)
      )
      res.render('index', { restaurants: filterRestaurants, keywords })
    })
    .catch(error => console.error(error))
})

module.exports = router
