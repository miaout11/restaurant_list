const express = require('express')
const router = express.Router()
const User = require('../../models/user')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// register page
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  // 檢查user是否已經註冊
  User.findOne({ email })
    .then(user => {
      // 已註冊，退回原畫面
      if (user) {
        console.log('User already exists.')
        res.render('register', { name, email, password, confirmPassword })
      } else {
        // 還沒註冊，將user data寫入資料庫
        return User.create({ name, email, password })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

module.exports = router
