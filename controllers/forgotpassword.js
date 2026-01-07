const { errorMonitor } = require("nodemailer/lib/xoauth2");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "please enter the email" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Not a valid user" });
        }
        const generateOTP = () => {
            return Math.floor(100000 + Math.random() * 900000)
        };
        const otp = generateOTP();
        user.otp = otp;
        await user.save();

        const transPorter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kirankumaruradi@gmail.com',
                pass: 'meaq hxrt ipox cgtv'
            }
        })
        const mailOptions = {
            from: "kirankumaruradi@gmail.com",
            to: email,
            subject: "Your BookMyStay OTP Code",
            text: `
            Hello,
            
            Your One-Time Password (OTP) to verify your account is: ${otp}
            
            Please use this code within the next 10 minutes. Do not share this OTP with anyone.
            
            Thank you,  
            BookMyStay Team
            `

        }
        transPorter.sendMail(mailOptions, (err) => {
            if (err) {
                return res.status(400).json({ message: "error in sending message" });
            }
            else {
                return res.status(200).json({ message: "Otp sent successfully" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "error in changing the password" });
    }
}
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!otp) {
            return res.status(400).json({ message: "please enter the otp" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Not a valid user" });
        }
        if (user.otp == otp) {
            user.otp = null;
            await user.save();
            return res.status(200).json({ message: "OTP verified successfully." });
        }
        else{
            return res.status(400).json({ message: "Not a valid otp" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error occurred while verifying OTP." });
    }
};
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        if (!newPassword) {
            return res.status(400).json({ message: "Please enter the password." });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found for the given email." });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, one number, and one special character."
            });
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully." });

    } catch (error) {
        console.error("Reset password error:", error); 
        return res.status(500).json({ message: "Error occurred while resetting password." });
    }
};


module.exports = { sendOTP, verifyOTP, resetPassword };


