const express = require("express");
const { userAuth } = require("../middleWare/auth");


const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, (req, res) => {
    try {
      const user = req.user;
  
      res.send(user);
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  });

module.exports = profileRouter;
