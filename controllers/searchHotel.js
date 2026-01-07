const Hotel = require("../models/hotelModel")
const searchHotels = async(req,res) =>{
    try{
        const {query} = req.query;
        if(!query) {
            return res.status(400).json({message:"Search query required"});
        }
        const hotels = await Hotel.find({
            name:{ $regex: query , $options: 'i' }
        });
        return res.status(200).json(hotels);

    }catch(error){
        return res.status(500).json({message:"Error", error: error.message})
    }
}

module.exports = searchHotels;
