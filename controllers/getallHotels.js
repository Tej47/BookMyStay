const Hotel = require('../models/hotelModel')
 
const fetchHotel = async(req, res)=>{
    try{
        const hotels = await Hotel.find();
        return res.status(200).json(hotels)
    }catch(error){
        return res.status(400).json({message: "Error loading Hotels", error:error.message})
    }
}
const fetchHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        return res.status(200).json(hotel);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching hotel", error: error.message });
    }
}
const fetchHotelNames = async (req, res) =>{
    try{
        const hotels= await Hotel.find({}, "name hotelId" );
        const hotelList = hotels.map(hotel=>({
            hotelId : hotel.hotelId,
            name : hotel.name
        }));
        return res.status(200).json({hotelList})
    }catch(error){
        return res.status(500).json({message:"Error fetching Hotel names and Ids", error:error.message})
    }
}
 
module.exports = { fetchHotel, fetchHotelById, fetchHotelNames };
