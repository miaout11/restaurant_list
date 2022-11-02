const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const app = express()
const port = 3000

const routes = require('./routes')
require('./config/mongoose')

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// use express-session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
// 設定載入靜態檔案
app.use(express.static('public'))
// setting body-parser
app.use(express.urlencoded({ extended: true }))
// use method-override
app.use(methodOverride('_method'))
// !!!重構路由器，將 request 導入路由器!!!
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
