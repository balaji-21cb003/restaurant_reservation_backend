const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  restaurantDetails: {
    city: String,
    cost: Number,
    location: String,
  },
  reservationDetails: {
    selectedDate: String,
    selectedTime: String,
    tableSize: Number,
    name: String,
    phoneNumber: String,
    email: String,
    occasion: String,
    specialRequest: String,
    userConfirmation: Boolean,
    optIn: Boolean,
    covidSafetyAgreement: Boolean,
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
