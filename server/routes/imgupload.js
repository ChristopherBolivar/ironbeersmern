const express = require('express')
const cloudinary = require('cloudinary')
// const formData = require('express-form-data')
const router = express.Router()
const cloudinaryConfig = require('../configs/cloudinary.js')
const cors = require('cors')
const User = require('../models/User')

console.log('hi')
router.post('/image-upload', (req, res, next) => {
  console.log(req.files, '+_+_+_+_+_+_+_', req.body)
  cloudinaryConfig.v2.uploader
    .upload(req.body.imageSrc, {
      resource_type: 'image',
      // publicID : req.body.requestID
    })
    .then(res => {
      console.log('989898989', res)
    })
    .catch(err => console.log('ERR', err))
  // const values = Object.values(req.files)
  // const promises = values.map(image => cloudinary.uploader.upload(image.path))

  // Promise.all(promises).then(results => res.json(results))
})

module.exports = router
