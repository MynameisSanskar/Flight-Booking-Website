const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusSchema = new Schema({
    companyName: {
        type: String
    },
    busType: {
        type: String
    },
    busNumber: {
        type: String
    },
    startCity: {
        type: String
    },
    destination: {
        type: String
    },
    totalSeats: {
        type: String
    },
    availableSeats: {
        type: String
    },
    pricePerSeat: {
        type: String
    },
    departureTime: {
        type: Date, // Use Date type for storing date and time together
        required: true
    },
    arrivalTime: {
        type: Date, // Use Date type for storing date and time together
        required: true
    }
}, {collection: "buses"});

const bus = mongoose.model('buses', BusSchema);

module.exports = bus;
