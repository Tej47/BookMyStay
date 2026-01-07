const User=require("../models/userModel");

const getAllUsers = async (req,res) => {
    try {
        const users = await User.find({role:"user"});  
        return res.status(200).json({users });  
    }catch(error){
        return res.status(500).json({ message: "Error fetching rooms", error: error.message });

    }
};
module.exports=getAllUsers;