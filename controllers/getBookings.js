const Booking = require('../models/BookingModel');
const Hotel = require("../models/hotelModel")


const getBookings = async(req, res) =>{
    try{
        const bookings = await Booking.find().select('userEmail hotelName guests totalPrice roomNumber checkInDate checkOutDate -_id');
        return res.status(200).json(bookings);
    }catch(error){
        return res.status(500).json({message:"Error fetching bookings", error: error.message});
    }
}



const getBookingsByName = async(req,res)=>{
    try{
        const {hotelName} = req.body;
        const hotel = await Hotel.findOne({name: hotelName})
        if(!hotel){
            return res.status(400).json({message: "There is no Hotel with the given name"})
        }
        // const bookings = await Booking.find({hotelName});
        const bookings = await Booking.find({hotelName}).select('userEmail hotelName guests totalPrice roomNumber checkInDate checkOutDate -_id');
        if(bookings.length == 0){
            return res.status(200).json({message: "There are no bookings for this Hotel"});
        }
        return res.status(200).json(bookings);

    }catch(error){
        return res.status(500).json({message: "Error fetching bookings for this Hotel", error: error.message})
    }
}


module.exports = {getBookings, getBookingsByName}
