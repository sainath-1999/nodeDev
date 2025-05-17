const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //get  the token
    const { token } = req.cookies;

    if (!token) {
      throw new Error("token is not valid!!!!!");
    }

    //validate the toke and get the data
    const decodedObj = await jwt.verify(token, "DEV@TINDER@123");

    const { _id } = decodedObj;

    const user =  await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    //here we are attaching the user into the req and calling the next
    req.user = user;

    next();
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};


module.exports = {
  userAuth,
};
