const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})
// add middleware 驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// register page
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  // 加入警告訊息
  const errors = []
  if (!email || !password) {
    errors.push({ message: '信箱及密碼是必填欄位！' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 檢查user是否已經註冊
  User.findOne({ email })
    .then(user => {
      // 已註冊，退回原畫面
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了!' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        // 還沒註冊，將user data寫入資料庫
        return User.create({ name, email, password })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router
