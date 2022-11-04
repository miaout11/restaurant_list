const express = require('express')
const router = express.Router()
const passport = require('passport')

// 向facebook發出請求
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 向google發出請求
router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
