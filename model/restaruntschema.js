const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  Locality: {
    type: String,
    required: true
  },
  City: {
    type: String,
    required: true
  },
  Cuisine: {
    type: String,
    required: true
  },
  Rating: {
    type: Number,
    required: true
  },
  Cost: {
    type: Number,
    required: true
  }
}, {
  collection: 'restaruntdetails' // Set the collection name
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
