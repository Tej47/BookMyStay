const mongoose = require("mongoose");
const validator = require("validator")
 
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  roomCount: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true,
    minLength: 10
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String
  },
  postalCode: {
    type: Number,
    required: true,
    length: 6,
    min: 100000,
    max: 999999,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  
  imageURL: {
    type: [String],
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isMobilePhone(value, 'any'),
      message: (props) => `${props.value} is not a valid phone number!`
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Please enter valid email address"
    }
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hotelId: {
    type: String,
    unique: true,
    required: true,
  },
});
 
module.exports = mongoose.model("Hotel", hotelSchema);
 