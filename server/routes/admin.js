const express = require('express')
const { isLoggedIn } = require('../middlewares')
const User = require('../models/User')
const Event = require('../models/event')
var axios = require('axios')
const router = express.Router()

router.get('/admin', isLoggedIn, (req, res, next) => {
  console.log(req.user.isAdmin)
  if (req.user.isAdmin) {
    res.json({
      admin: true,
    })
  } else {
    res.json({
      admin: false,
    })
  }
})

router.post('/add-event', isLoggedIn, (req, res, next) => {
  // console.log('+_+_+_+_+_+_+_', req.body.zipcode)
  // console.log('+_+_+_+_', req.user)
  axios
    .get(
      ` https://www.zipcodeapi.com/rest/SmrKePZleLeCMUT7NjUAgC849XnC9wI0dQJ37zrlafv7MfqhVRYehFWfC6coBroa/radius.json/${req.body.zipcode}/${req.body.miles}/mile `
    )
    .then(data => {
      console.log(
        '++_+_+_+_+__+_+',
        req.body.eventName,
        req.body.zipcode,
        req.body.miles
      )
      console.log(data.data)

      Event.create({
        eventname: req.body.eventName,
        affectedArea: data.data.zip_codes,
      })
        .then(element => {
          console.log('success')
        })
        .catch(err => next(err))
    })
    .catch(err => console.log(err))
})

module.exports = router
