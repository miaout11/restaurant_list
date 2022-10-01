const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results 

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
// 設定載入靜態檔案
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList });
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
    const keywords = req.query.keywords
    const restaurants = restaurantList.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keywords.trim().toLowerCase()) ||
        restaurant.category.includes(keywords.trim())
    })
    res.render('index', { restaurants: restaurants, keywords: keywords })
})

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})