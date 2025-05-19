const express = require("express");
const { userAuth } = require("../middleWare/auth");

const requestRouter = express.Router();

requestRouter.post("/sendingConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  //sending connection request

  console.log("request connection is sent for the connection!!!");

  res.send(user.firstName + " sent the connection Request!!!!!");
});
module.exports = requestRouter;
