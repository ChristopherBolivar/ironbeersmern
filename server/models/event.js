const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema(
  {
    eventname: String,
    affectedArea: Array,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
