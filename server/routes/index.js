const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const Beer = require('../models/Beer')
const User = require('../models/User')

router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user,
  })
})
router.get('/', (req, res, next) => {
  Beer.find()
    .then(beers => {
      res.json(beers)
    })
    .catch(err => next(err))
})
router.post('/validate-user', (req, res, next) => {
  console.log('backend called', '=-=-=-=-=-+_+_+_+__+_+_+_+_+_+_+_+_+_+_+')
  User.findByIdAndUpdate(req.user._id, {
    verified: true,
  }).catch(err => console.log(err))
})

module.exports = router
