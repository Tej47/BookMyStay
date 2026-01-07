const Hotel=require("../models/hotelModel");
 
const deleteHotel=async(req,res)=>{
    const hotelId = req.params.id;
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
        if (!deletedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
          }      
        return res.status(200).json({ message: "Hotel deleted successfully!" });
 
    } catch (error) {
        res.status(500).json({ message: "Error deleting hotel", error: error.message });
    }
     
}
module.exports=deleteHotel;
 
 
