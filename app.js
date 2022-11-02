const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes')
// 匯入passport設定檔，要寫在 exress-session 後
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = 3000

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// use express-session 儲存認證結果
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

// 呼叫 usePassport 函式並傳入參數 app，要寫在路由之前
usePassport(app)

// 重構路由器，將 request 導入路由器
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
