const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const Beer = require('../models/beer')

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

module.exports = router
