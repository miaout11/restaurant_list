const express = require('express')
const router = express.Router()
const Restaurant = require("../../models/restaurant")

// 定義首頁路由
router.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
})

// search function
router.get('/search', (req, res) => {
    if (!req.query.keywords) {
        return res.redirect("/")
    }
    const keywords = req.query.keywords
    const keyword = req.query.keywords.trim().toLowerCase()

    Restaurant.find({})
        .lean()
        .then(restaurants => {
            const filterRestaurants = restaurants.filter(
                list =>
                    list.name.toLowerCase().includes(keyword) ||
                    list.category.includes(keyword)
            )
            res.render('index', { restaurants: filterRestaurants, keywords })
        })
        .catch(error => console.error(error))
})

module.exports = router


