const mongoose=require("mongoose");
const validator =require("validator");
const { default: isEmail } = require("validator/lib/isEmail");


const UserSchema=new mongoose.Schema({
    name :{
        type:String,
        required:true,
        minlength:[3,"username should be minimum of 3 letters"]
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator :function(value){
                return validator.isEmail(value);
            },
            message:"Please enter valid email address"
        }
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin","superAdmin"]
    },
    userId:{
        type:String,
        required:false
    },
    otp: {
        type: String,
    },
    subscription:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true,
        minlength: 6,
        validate: {
          validator: function(value) {
            return /[A-Z]/.test(value) && /\d/.test(value) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
          },
          message: "Password must contain at least one uppercase letter, one number, and one special character."
        }
        
    }
})

module.exports=mongoose.model("User",UserSchema);