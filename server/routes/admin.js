const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

router.get('/admin', isLoggedIn, (req, res, next) => {
  console.log(req.user)
})

module.exports = router
