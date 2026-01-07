const nodemailer = require('nodemailer');
const Booking = require('../models/BookingModel');

const RoomBooking = async (req, res) => {
  try {
    const {
      userEmail,
      hotelId,
      hotelName,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice
    } = req.body;


    const firstLetter = hotelName.trim()[0].toUpperCase();
    const randomDigits = Math.floor(10 + Math.random() * 90);
    const roomNumber = `${firstLetter}${randomDigits}`;

    const newBooking = new Booking({
      userEmail,
      hotelId,
      hotelName,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      roomNumber
    });

    await newBooking.save();

   
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kirankumaruradi@gmail.com',
        pass: 'meaq hxrt ipox cgtv'
      }
    });


    const mailOptions = {
      from: 'kirankumaruradi@gmail.com',
      to: userEmail,
      subject: `Booking Confirmation - ${hotelName}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; background: #f7f9fb; padding: 40px;">
          <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.1);">
            <div style="background: #4f46e5; color: white; padding: 20px 30px;">
              <h2 style="margin: 0;">Booking Confirmed 🎉</h2>
              <p style="margin: 5px 0 0;">Thanks for booking with <strong>${hotelName}</strong></p>
            </div>
            <div style="padding: 30px;">
              <p>Hello,</p>
              <p>We are happy to confirm your booking. Below are your booking details:</p>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 10px; border: 1px solid #eee;">Hotel Name:</td>
                  <td style="padding: 10px; border: 1px solid #eee;"><strong>${hotelName}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eee;">Room Number:</td>
                  <td style="padding: 10px; border: 1px solid #eee;"><strong>${roomNumber}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eee;">Check-In:</td>
                  <td style="padding: 10px; border: 1px solid #eee;">${new Date(checkInDate).toDateString()}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eee;">Check-Out:</td>
                  <td style="padding: 10px; border: 1px solid #eee;">${new Date(checkOutDate).toDateString()}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eee;">Guests:</td>
                  <td style="padding: 10px; border: 1px solid #eee;">${guests}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eee;">Total Price:</td>
                  <td style="padding: 10px; border: 1px solid #eee;"><strong>$${totalPrice}</strong></td>
                </tr>
              </table>
              <p>We look forward to welcoming you!</p>
              <p style="margin-top: 30px;">Cheers,<br/><strong>The ${hotelName} Team</strong></p>
            </div>
            <div style="background: #f1f5f9; text-align: center; padding: 20px; font-size: 12px; color: #555;">
              Please do not reply to this email. For support, contact our help desk.
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

module.exports = RoomBooking;
