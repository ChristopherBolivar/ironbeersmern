const express = require('express')
const cloudinary = require('cloudinary')
const router = express.Router()
const cloudinaryConfig = require('../configs/cloudinary.js')
const cors = require('cors')
const User = require('../models/User')
const { isLoggedIn } = require('../middlewares')
var jsdom = require('jsdom').jsdom
var axios = require('axios')
var $ = require('jquery')

const session = require('express-session')

router.post('/image-upload', isLoggedIn, (req, res, next) => {
  // console.log(req.files, '+_+_+_+_+_+_+_', req.body)
  console.log('+_+_+_+_', req.user)
  cloudinaryConfig.v2.uploader
    .upload(req.body.imageSrc, {
      resource_type: 'image',
    })
    .then(response => {
      // console.log('989898989', res.url)
      console.log('==========>', req.user)
      // **********************************************
      // *** Update or verify the following values. ***
      // **********************************************
      let subscriptionKey = '7cae632473db490b894842e6a60f210a'
      let endpoint = 'https://sosvisa.cognitiveservices.azure.com/'
      if (!subscriptionKey) {
        throw new Error(
          'Set your environment variables for your subscription key and endpoint.'
        )
      }
      var uriBase = endpoint + 'vision/v2.0/ocr'
      // Request parameters.
      var params = {
        language: 'en',
        detectOrientation: 'true',
      }
      // Display the image.

      //axios.post(url, data, headers, callback)

      axios
        .post(
          uriBase + '?language=en&detectOrientation=true',
          '{"url": ' + '"' + response.url + '"}',
          {
            headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key': subscriptionKey,
            },
          }
        )
        .then(data => {
          console.log('=-=-=-=-==-', data.stuff)
          res.json({ stuff: data.data })
          //data.data.regions.forEach(reg => //console.log(reg.lines.words))
          //data.regions[3].lines.forEach(obj => console.log(obj.words[0].text))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log('ERR', err))
})

router.post('/add-lic-info', isLoggedIn, (req, res, next) => {
  console.log(req.user._id, '=-=-=-=-=-=-=-=-=-=-DAUSER')

  // console.log(req.body, '+_+_+_+_+_+_+_+_+_+_+_+ DABODY')

  User.findByIdAndUpdate(req.user._id, {
    doc_info: {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      zip: req.body.zip,
      dob: req.body.dob,
      sex: req.body.sex,
    },
  }).catch(err => console.log(err))
})
module.exports = router
