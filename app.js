const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

// 匯入passport設定檔
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()

const PORT = process.env.PORT

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// use express-session 儲存認證結果
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// 設定載入靜態檔案
app.use(express.static('public'))

// setting body-parser
app.use(express.urlencoded({ extended: true }))

// use method-override
app.use(methodOverride('_method'))

// 呼叫 usePassport 函式並傳入參數 app，要寫在路由之前
usePassport(app)

// use flash
app.use(flash())

// add auth middleware，需放在usePassport(app)之後，app.use(routes)之前
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 重構路由器，將 request 導入路由器
app.use(routes)

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
