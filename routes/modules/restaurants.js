const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// login page
router.get('/login', (req, res) => {
  return res.render('login')
})

// create new restaurant
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  console.log(req.body.name.length)
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})
// show page
router.get('/:id', (req, res) => {
  return Restaurant.findById(req.params.id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})
// edit page
router.get('/:id/edit', (req, res) => {
  return Restaurant.findById(req.params.id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})
// update restaurant info
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})
// delete restaurant
router.delete('/:id', (req, res) => {
  return Restaurant.findById(req.params.id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
