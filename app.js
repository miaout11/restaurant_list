const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const port = 3000
const Restaurant = require("./models/restaurant")
const routes = require('./routes')

mongoose.connect(process.env.MONGODB_PATH, { useNewUrlParser: true, useUnifiedTopology: true }) // 連線到mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection
db.on('error', () => {
    console.log('mongode error')
})
db.once('open', () => {
    console.log('mongodb connected!')
})

const app = express()
// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
// 設定載入靜態檔案
app.use(express.static('public'))
// setting body-parser
app.use(express.urlencoded({ extended: true }))
// !!!重構路由器，將 request 導入路由器!!!
app.use(routes)

// // search function
// app.get('/search', (req, res) => {
//     if (!req.query.keywords) {
//         return res.redirect("/")
//     }
//     const keywords = req.query.keywords
//     const keyword = req.query.keywords.trim().toLowerCase()

//     Restaurant.find({})
//         .lean()
//         .then(restaurants => {
//             const filterRestaurants = restaurants.filter(
//                 list => 
//                 list.name.toLowerCase().includes(keyword) ||
//                 list.category.includes(keyword)
//             )
//             res.render('index', { restaurants: filterRestaurants, keywords })
//         })
//         .catch(error => console.error(error))
//     })

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})