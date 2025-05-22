const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../util/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //first vallidation
    validateSignUpData(req);

    const { password, firstName, lastName, emailId } = req.body;

    //password encrption
    const passwordHash = await bcrypt.hash(password, 10);

    //Create a new instance of the User model
    const user = User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added to the database successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials!!!");
    }

    const passwordIsMatched = await user.validatePassword(password);

    if (passwordIsMatched) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 2 * 3600000),
      });
      res.send("Login successful!!!");
    } else {
      throw new Error("Invalid credentials!!!");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

authRouter.post("/logout", async(req,res) => {
    try{
        res.cookie("token", "", {
            expires: new Date(0),
            httpOnly:true
        })
        res.send("logout successfull!!!")
    }catch (error) {
        res.status(500).send("Error during logout: "+ error.message )
    }
})

module.exports = authRouter;
