const express = require("express");
const connectDB = require("./config/database")
const app = express(); ///creating new web server
const User = require("./models/user")

app.post("/signup", async (req, res) => {
  //Create a new instance of the User model
  const user = new User({
    firstName: "virat",
    lastName: "kohli",
    emailId: "virat@kohli.com",
    password: "virat@123",
  });

  try{
    await user.save();
    res.send("User Added to the database successfully!")
  }  catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
})

connectDB()
.then( () => {
  console.log("connectd to Database successfully...");
  app.listen( 7777, ()=> {
    console.log("listiening successuflly on the port 7777...");
  })
})
.catch ( (err) => {
  console.error("error in connecting to the database...");
  
})




