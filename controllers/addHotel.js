const Hotel = require('../models/hotelModel');
const User = require('../models/userModel');
 
 
const addHotel = async (req, res) => {
    const { name, roomCount, description, starRating, address, city, country, postalCode,phoneNumber, email, imageURL } = req.body;
    const hotelId = Math.floor(100000 + Math.random() * 900000);
 
    try {
        // console.log("start")
        console.log("req body: ", req.body)
        if (!name || !roomCount || !description || !starRating || !address || !city || !country || !postalCode || !phoneNumber || !email || !imageURL || !hotelId) {
            // console.log("commingggg")
            return res.status(400).json({ message: "please enter all details " });
        }
 
        const existingHotel = await Hotel.findOne({ name });
        if (existingHotel) {
            return res.status(400).json({ message: "Hotel with this name already exists!" });
        }
 
        const adminUser = await User.findOne({email});
        if (!adminUser) {
            return res.status(400).json({ message: "Could not find a user with the given email" });
        }
        if(adminUser.role!="admin"){
            return res.status(400).json({ message: "Not an admin"})
        }
        const newHotel = new Hotel({
            name,
            roomCount,
            description,
            starRating,
            address,
            city,
            country,
            postalCode,
            phoneNumber,
            email,
            imageURL,
            hotelId
        });
 
        await newHotel.save();
        return res.status(201).json({ message: "Hotel added successfully!", hotelId });
 
    } catch (error) {
        console.error("Server error while adding hotel:", error);
        return res.status(500).json({ message: "Error adding hotel. Please try again!", error: error.message });
    }

};
 
module.exports = addHotel;  
 