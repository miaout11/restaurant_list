const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// create new restaurant
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, nameEn, category, image, location, phone, googleMap, rating, description } = req.body
  return Restaurant.create({
    name,
    nameEn,
    category,
    image,
    location,
    phone,
    googleMap,
    rating,
    description,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})
// show page
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})
// edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})
// update restaurant info
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOneAndUpdate({ _id, userId }, req.body, { returnNewDocument: true })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.error(error))
})
// delete restaurant
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
