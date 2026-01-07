const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

const Signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email||!password){
            return res.status(400).json({ message: "Enter all details" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }
        // if (user.role !== 'user') {
        //     return res.status(403).json({ message: "Access denied. Only users can log in." });
        // }
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }
        const token = jwt.sign({email: email, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1d"})

        return res.status(200).json({ message: "Sign-in successful",  email: user.email, token });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = Signin;

