const express = require('express')
const mongoose = require('mongoose') //載入mongoose
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurant = require("./models/Restaurant")

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 連線到mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection
db.on('error', () => {
    console.log('mongode error')
})
db.once('open', () => {
    console.log('mongodb connected!')
})

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
// 設定載入靜態檔案
app.use(express.static('public'))
// setting body-parser
app.use(express.urlencoded({ extended: true }))

// routes setting --get all data here
app.get('/', (req, res) => {
    Restaurant.find() // 叫model去資料庫找資料
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
})

// show more info
app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show', { restaurant: restaurant })
})

// search function
app.get('/search', (req, res) => {
    if (!req.query.keywords) {
        return res.redirect("/")
    }
    const keywords = req.query.keywords.trim()
    const restaurants = restaurantList.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keywords.toLowerCase()) ||
        restaurant.category.includes(keywords)
    })
    res.render('index', { restaurants: restaurants, keywords: keywords })
})

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})