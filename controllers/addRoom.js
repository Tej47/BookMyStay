const Hotel = require("../models/hotelModel");
const Room = require("../models/roomModel");


const addRoomToHotel = async (req, res) => {
    const { hotelId,adminId, roomNumber, roomType, price, status } = req.body;

    try {
        if (!hotelId||!adminId || !roomNumber || !roomType || !price) {
            return res.status(400).json({ message: "Please enter all details." });
        }

        const hotel = await Hotel.findOne({ hotelId });
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found!" });
        }
        if (hotel.adminId !== adminId) {
            return res.status(403).json({ message: "Unauthorized! Only the assigned admin can add rooms to this hotel." });
        }
        const existingRoom = await Room.findOne({ hotelId}, roomNumber );
        if (existingRoom) {
            return res.status(400).json({ message: "Room with this number already exists in the hotel!" });
        }
        const newRoom = new Room({
            hotel: hotelId,
            roomNumber,
            roomType,
            price,
            status: status || "Available",
        });

        await newRoom.save();

        return res.status(201).json({ message: "Room added successfully!", data: newRoom });

    } catch (error) {
        return res.status(500).json({ message: "Error adding room. Please try again!", error: error.message });
    }
};

module.exports = addRoomToHotel;
