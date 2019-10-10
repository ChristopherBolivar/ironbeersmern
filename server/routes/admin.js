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
      `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${req.body.zipcode}&minimumradius=0&maximumradius=50&key=32YBND6G78FH2U4WG1ZF`
    )
    .then(data => {
      console.log('=-=-=-=-==-', data.data)
      console.log('++_+_+_+_+__+_+', req.body.eventName)
      Event.create({
        eventname: req.body.eventName,
        affectedArea: data.data,
      })
        .then(element => {
          console.log('success')
        })
        .catch(err => next(err))

      // res.json({ stuff: data.data })
    })
    .catch(err => console.log(err))
})

module.exports = router
