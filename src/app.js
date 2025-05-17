const express = require("express");
const connectDB = require("./config/database");
const app = express(); ///creating new web server
const bcrypt = require("bcrypt");
const User = require("./models/user");
const { validateSignUpData } = require("./util/validation");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleWare/auth");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

//we should never trust the req.body

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials!!!");
    }

    const passwordIsMatched = await user.validatePassword(password);

    if (passwordIsMatched) {
      const token = await user.getJWT();
      
      res.cookie("token", token, {expires: new Date(Date.now() + 2 * 3600000)});
      res.send("Login successful!!!");
    } else {
      throw new Error("Invalid credentials!!!");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.get("/profile", userAuth, (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/sendingConnectionRequest", userAuth, async (req,res) => {

  const user = req.user;
  //sending connection request

  console.log("request connection is sent for the connection!!!");

  res.send(user.firstName + " sent the connection Request!!!!!")
})


app.post("/signup", async (req, res) => {
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

connectDB()
  .then(() => {
    console.log("connectd to Database successfully...");
    app.listen(7777, () => {
      console.log("listiening successuflly on the port 7777...");
    });
  })
  .catch((err) => {
    console.error("error in connecting to the database...");
  });
