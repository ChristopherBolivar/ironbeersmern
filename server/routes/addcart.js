const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const Beer = require('../models/Beer')
const User = require('../models/User')

router.post('/add-cart', (req, res, next) => {
  console.log(req.body, '=-=-=-=-=-=-=-=-=-=-=-')
  User.findByIdAndUpdate(req.user._id, {
    cart: req.body,
  }).catch(err => console.log(err))
})

router.get('/user-info', (req, res, next) => {
  User.findById(req.user._id)
    .then(info => {
      console.log(info.cart)
      res.json(info.cart)
    })
    .catch(err => console.log(err))
})
router.get('/user-state', (req, res, next) => {
  User.findById(req.user._id)
    .then(info => {
      console.log(info.verified)
      res.json(info.verified)
    })
    .catch(err => console.log(err))
})

module.exports = router
