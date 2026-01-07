const jwt = require("jsonwebtoken");

const verifyToken = async(req, res, next) => {
    // console.log("Auth header:", req.headers['authorization']);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Login First" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // if(req.user.role !== "user"){
        //     return res.status(400).json({message: "Not a User"})
        // }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = verifyToken;