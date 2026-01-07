const Hotel = require('../models/hotelModel');
const User = require('../models/userModel');
 
const EditHotel = async (req, res) => {
  const {
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
    imageURL
  } = req.body;
 
  try {
    if (!name || !roomCount || !description || !starRating || !address || !city || !country || !postalCode || !phoneNumber || !email) {
        return res.status(400).json({ message: "please enter all details " });
    }
    const existingHotel = await Hotel.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (!existingHotel) {
      return res.status(404).json({ message: "Hotel not found with this name." });
    }
 
    const adminUser = await User.findOne({ email });
    if (!adminUser) {
      return res.status(404).json({ message: "User not found with the given email." });
    }
 
    if (adminUser.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized: Only admin users can edit hotels." });
    }
 
    existingHotel.roomCount = roomCount;
    existingHotel.description = description;
    existingHotel.starRating = starRating;
    existingHotel.address = address;
    existingHotel.city = city;
    existingHotel.country = country;
    existingHotel.postalCode = postalCode;
    existingHotel.phoneNumber = phoneNumber;
    if(imageURL){
        existingHotel.imageURL = imageURL
    };
 
    await existingHotel.save();
 
    return res.status(200).json({ message: "Hotel updated successfully!" });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating hotel. Please try again!",
      error: error.message
    });
  }
};
 
module.exports = EditHotel;
 
 