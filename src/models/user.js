const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 4,
      maxLength: 40,
      required: true,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 40,
      required: true,
    },
    emailId: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
      validate(value) {
        if(!validator.isEmail(value)){
          throw new Error("Invalid email!!!" + value)
        }
      }
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("The gender data is not found");
        }
      },  
    },
    age:{
      type:Number,
    },
    about: {
      type: String,
      default: "The default values of about is new",
    },
    photoUrl: {
      type: String,
      default:
        " https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1746098186~exp=1746101786~hmac=b52635d0c00d033ffd23a10b0988609561c7cae6310b9f4d1c7fe680d9d7c999&w=1380",
      // validate(value) {
      //     if(!validator.isURL(value)){
      //       throw new Error("Invalid URL:"+ value)
      //     }
      // }
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  
  const token = await jwt.sign({_id: user._id}, "DEV@TINDER@123", {expiresIn: '1 h'})

  return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
   const user = this;
   const passwordHash = user.password

   const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);
