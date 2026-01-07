const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");




const signUp = async (req, res) => {
    const { name, email, password, } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please Enter all the details" })
    }
    const user = await User.findOne({ email });

    if (user) {
        if (user.role == "user") {
            return res.status(400).json({ message: "you already exists " });
        }
    }
    const userId = Math.floor(100000 + Math.random() * 900000);

    const transPorter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kirankumaruradi@gmail.com',
            pass: 'meaq hxrt ipox cgtv'
        }
    });
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Book My Stay</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f7fa;
                color: #333;
            }
            .email-container {
                max-width: 650px;
                margin: 30px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header img {
                width: 150px;
                margin-bottom: 10px;
            }
            .header h1 {
                font-size: 26px;
                color: #1e90ff;
                margin: 0;
            }
            .content {
                text-align: center;
                margin-bottom: 30px;
            }
            .content h2 {
                font-size: 22px;
                color: #333;
            }
            .content p {
                font-size: 16px;
                line-height: 1.5;
                color: #555;
            }
            .cta-button {
                display: inline-block;
                background-color: #007bff;
                color: white;
                padding: 14px 30px;
                text-decoration: none;
                border-radius: 6px;
                font-size: 18px;
                font-weight: bold;
                margin-top: 20px;
            }
            .footer {
                text-align: center;
                font-size: 14px;
                color: #777;
                margin-top: 40px;
            }
            .footer a {
                color: #007bff;
                text-decoration: none;
            }
            /* Responsive design */
            @media screen and (max-width: 600px) {
                .email-container {
                    padding: 20px;
                }
                .header h1 {
                    font-size: 22px;
                }
                .cta-button {
                    padding: 12px 25px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <img src="C:/Users/kirankumaru/Documents/Book My Stay/539787-istock-674909778.jpg" alt="Book My Stay Logo">
                <h1>Welcome to Book My Stay</h1>
            </div>

            <div class="content">
                <h2>Hello ${name},</h2>
                <p>We’re thrilled to welcome you to our community! Your account has been created successfully, and we’re excited to have you on board. Below are your login details:</p>
                
                <p><strong>User ID:</strong> ${userId}</p>
                <p><strong>Password:</strong> ${password}</p>

                <p>Please click the button below to log in and start your journey with us.</p>

                <a href="" class="cta-button">Login to Your Account</a>
            </div>

            <div class="footer">
                <p>&copy; 2025 Book My Stay. All Rights Reserved.</p>
                <p>If you have any questions, feel free to contact us at <strong>support@bookmystay.com</strong>.</p>
            </div>
        </div>
    </body>
    </html>
    `;


    const mailOptions = {
        from: "kirankumaruradi@gmail.com",
        to: email,
        subject: 'invitation to join in our platform',
        text: `Hello ${name},\n\nYour account has been created successfully. Here are your login details:\n\nUser ID: ${userId}\nPassword: ${password}\n\nPlease change your password once you log in.\n\nBest regards,\nYour Company`,
        html: htmlContent
    }



    try {

        const admins = await User.find({ role: "admin" }).select("email");
        const adminEmails = admins.map(admin => admin.email);
        // const result=[email, ...adminEmails]


        const newuser = new User({
            name,
            email,
            password,
            userId,
            role: "user"
        })
        await newuser.save();
        transPorter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({ message: "Error in sending email" });
            }
            else {
                return res.status(200).json({ success: "data inserted" , message: "user Email sent successfully", "userId": userId, "password": password });
            }

        })
        if (adminEmails.length > 0) {
            const adminMailOptions = {
                from: "kirankumaruradi@gmail.com",
                to: adminEmails,
                subject: "New User Registered",
                text: `A new user (${name}) has joined our platform with the email: ${email}.\n\nPlease review and take necessary actions.\n\nBest,\nBookMyStay Admin Team`,
                html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New User Registration</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f7fa;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 30px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                background-color: #007bff;
                color: white;
                padding: 15px;
                font-size: 22px;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
                text-align: left;
            }
            .content h2 {
                color: #333;
                font-size: 20px;
            }
            .content p {
                font-size: 16px;
                line-height: 1.5;
                color: #555;
            }
            .user-details {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 6px;
                margin-top: 10px;
            }
            .user-details p {
                margin: 5px 0;
            }
            .footer {
                text-align: center;
                font-size: 14px;
                color: #777;
                margin-top: 20px;
            }
            .footer a {
                color: #007bff;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                🚀 New User Registered!
            </div>
            <div class="content">
                <h2>Hello Admin,</h2>
                <p>A new user has successfully registered on <strong>Book My Stay</strong>. Here are the details:</p>
                <div class="user-details">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Role:</strong> User</p>
                </div>
                <p>Please review and take necessary actions if required.</p>
            </div>
            <div class="footer">
                <p>&copy; 2025 Book My Stay. All Rights Reserved.</p>
                <p>For support, contact us at <strong>admin@bookmystay.com</strong>.</p>
            </div>
        </div>
    </body>
    </html>
    `
            }
            await transPorter.sendMail(adminMailOptions);
            console.log("Admin notification email sent successfully!");
        }
    } catch (error) {
        return res.status(400).json({ message: "Error in adding a new user sorry try again!", error: error.message });
    }
}
module.exports = { signUp };


