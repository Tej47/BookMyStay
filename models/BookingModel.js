const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    hotelName: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guests: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    roomNumber: {type: String,required: true }

}, { timestamps: true });
module.exports = mongoose.model('Booking', bookingSchema);