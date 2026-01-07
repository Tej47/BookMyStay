const nodemailer = require("nodemailer");

const SubSuccess = async (req, res) => {
    const { email } = req.body;


    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Invalid email address." });
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kirankumaruradi@gmail.com',
            pass: 'meaq hxrt ipox cgtv' 
        }
    });

    const mailOptions = {
        from: '"Our Awesome Website" <kirankumaruradi@gmail.com>',
        to: email,
        subject: "Subscription Confirmation",
        text: "Thank you for subscribing to our page! We're glad to have you with us.",
        html: `<h2>Thank you for subscribing!</h2><p>We appreciate your interest in our website.</p>`
    };

    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Email error:", error);
                return res.status(400).json({ message: "Error in sending email" });
            } else {
                return res.status(200).json({ message: "Email sent successfully!" });
            }
        });
    } catch (error) {
        console.error("Catch error:", error);
        return res.status(500).json({
            message: "Error in sending confirmation email. Please try again.",
            error: error.message
        });
    }
};

module.exports = SubSuccess;
