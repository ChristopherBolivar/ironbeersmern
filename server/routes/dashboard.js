const express = require('express')
const { isLoggedIn } = require('../middlewares')
const User = require('../models/User')
const Event = require('../models/event')
const router = express.Router()

router.get('/dashboard', (req, res, next) => {
  console.log(req.user)
  console.log('hello')
  User.find()
    .then(events => {
      res.json(events)
    })
    .catch(err => next(err))
})

module.exports = router
