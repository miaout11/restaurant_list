const passport = require('passport')
const LocalStratege = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  // 初始化 passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStratege({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('warning_msg', '這個Email還沒有註冊過。'))
        }
        if (user.password !== password) {
          return done(null, false, req.flash('warning_msg', '密碼或Email錯誤。'))
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))

  // 設定序列化跟反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
