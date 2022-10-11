const express = require('express')
const mongoose = require('mongoose') //載入mongoose
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurant = require("./models/Restaurant")

mongoose.connect(process.env.MONGODB_PATH, { useNewUrlParser: true, useUnifiedTopology: true }) // 連線到mongoDB
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

// search function
app.get('/search', (req, res) => {
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

// create new restaurant
app.get('/restaurants/new', (req, res) => {
    return res.render('new')
  })
  app.post('/restaurants', (req, res) => {
    Restaurant.create(req.body)
      .then(() => res.redirect('/'))
      .catch(error => console.error(error))
  })

// show page
app.get('/restaurants/:id', (req, res) => {
    return Restaurant.findById(req.params.id)
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(error => console.error(error))
})

// edit page
app.get('/restaurants/:id/edit', (req, res) => {
    return Restaurant.findById(req.params.id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => console.error(error))
})
// update restaurant info
app.post('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => {
            restaurant.name = req.body.name
            restaurant.category = req.body.category
            restaurant.image = req.body.image
            restaurant.location = req.body.location
            restaurant.phone = req.body.phone
            restaurant.google_map = req.body.google_map
            restaurant.rating = req.body.rating
            restaurant.description = req.body.description
            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.error(error))
})


// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})