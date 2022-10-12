const express = require('express')
// const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const port = 3000
const routes = require('./routes')
require('./config/mongoose')

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

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})