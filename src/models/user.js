const mongoose = require("mongoose");

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
      lowerCase: true,
      trim: true,
      unique: true,
      required: true,
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
    about: {
      type: String,
      default: "The default values of about is new",
    },
    photoUrl: {
      type: String,
      default:
        " https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1746098186~exp=1746101786~hmac=b52635d0c00d033ffd23a10b0988609561c7cae6310b9f4d1c7fe680d9d7c999&w=1380",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
