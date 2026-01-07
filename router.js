const express=require("express");
const { signUp } = require("./controllers/userSignup");
const getAllUsers = require("./controllers/getallUsers");
const { adminsignUp } = require("./controllers/adminsignup");
const Signin = require("./controllers/Signin");
const addHotel = require("./controllers/addHotel");
const updateHotel = require("./controllers/updateHotel");
const {fetchHotel,fetchHotelById, fetchHotelNames} = require("./controllers/getallHotels");
const deleteHotel = require("./controllers/deleteHotel");
const addRoomToHotel = require("./controllers/addRoom");
const { sendOTP, verifyOTP, resetPassword } = require("./controllers/forgotpassword");
const SubSuccess = require("./controllers/SubSuccess");
// const Booking = require("./controllers/Booking");
const RoomBooking = require("./controllers/Booking");
const { createPaymentIntent } = require("./controllers/Payment");
const verifyTokenAdmin = require("./controllers/verifyTokenAdmin")
const verifyTokenUser = require("./controllers/verifyTokenUser");
const {getBookings, getBookingsByName} =require("./controllers/getBookings");
const EditHotel = require("./controllers/EditHotel");
const searchHotels = require("./controllers/searchHotel");




const router=express.Router();




//user module
router.post("/signup",signUp);
router.get("/getallusers",getAllUsers);
router.post("/adminsignup",adminsignUp);
router.post("/signin",Signin);

//forgot password
router.post("/sendotp",sendOTP);
router.post("/verifyotp",verifyOTP);
router.post("/resetpassword",resetPassword);



//hotel module
// router.post("/addhotel",addHotel);
router.post("/updateHotel",updateHotel);
router.get("/hotelnames", fetchHotelNames);
router.get("/searchhotels", searchHotels);
router.get("/getallhotels",fetchHotel);
router.get('/hotels/:id',fetchHotelById);
router.delete("/deletehotel/:id", verifyTokenAdmin, deleteHotel);
router.post("/book", RoomBooking)
router.post("/edithotel", verifyTokenAdmin, EditHotel)

router.post('/addhotel', verifyTokenAdmin, addHotel)
//room module
router.post("/addroom",addRoomToHotel);
router.post("/subsuccess",SubSuccess);


// booking module
router.get("/getbookings", getBookings)
router.get("/getbookingsname", getBookingsByName)


//payment 
router.post('/payment',verifyTokenUser, createPaymentIntent)

module.exports=router;

