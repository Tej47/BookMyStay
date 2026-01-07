// const User = require("../models/userModel")
// const jwt = require("jsonwebtoken")

// const verifyToken = (req, res, next)=>{
//     const {token}= req.body;
//     if(!token || token ==''){
//         return res.status(401).json({message: "Login First"});
//     }
//     try{
//         const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
//         req.user = decoded;
//         next();
//     }catch{
//         return res.status(401).json({message:"Invalid Token"})
//     }
// }

// module.exports = verifyToken
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log("Auth header:", req.headers['authorization']);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Login First" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if(req.user.role !== "admin"){
            return res.status(400).json({message: "Not an Admin"})
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = verifyToken;
