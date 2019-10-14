const mongoose = require('mongoose')
const Schema = mongoose.Schema

const beerSchema = new Schema({
  id: { type: Number },
  name: String,
  tagline: String,
  description: String,
  image_url: String,
  abv: String,
  food_pairing: Array,
  price: {
    type: Number,
    default: 6,
  },
})

const Beer = mongoose.model('Beer', beerSchema)
module.exports = Beer
