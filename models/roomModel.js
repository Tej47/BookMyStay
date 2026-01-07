const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
    },
    roomNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    roomType: {
        type: String,
        required: true,
        enum: ["Single", "Double", "Suite", "Deluxe"],
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ["Available", "Booked", "Under Maintenance"],
        default: "Available",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Room", roomSchema);
