const express = require("express");
const connectDB = require("./config/database")
const app = express(); ///creating new web server
const User = require("./models/user")

app.use(express.json())
app.post("/signup", async (req, res) => {
  //Create a new instance of the User model
  const user = User(req.body)

  try{
    await user.save();
    res.send("User Added to the database successfully!")
  }  catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
})

app.get("/user", async(req, res) => {

  // const userEmail = req.body.emailId;

  
  try{
    const users = await User.find({})
  if(users === 0){
    res.status(404).send("User not found")
  }else{
    res.send(users)
  }
  }catch{
    res.status(400).send("Unavailable to send the data!!!")
  }
})

app.get("/getUser", async(req, res) => {

  const email = req.body.emailId;

  try{
    const user = await User.findOne({emailId: email})
    if(!user){
      res.status(404).send("user not found");
    }else{
      res.send(user)
    }
  }catch{
    res.status(400).send("user unavailable!!!"); 
  }
})

app.delete("/user", async(req, res) => {
  const userId = req.body.userId;

  try{
    const userDelete = await User.findByIdAndDelete({_id: userId})
    
    res.send("User deleted successfully");
  }catch{
    res.status(400).send("something went wrong!!!!")
  }
})

app.patch("/user", async(req,res) => {
  const userEmail = req.body.emailId;
  const updatedData = req.body

  try{
     const user = await User.findOneAndUpdate({emailId: userEmail}, updatedData , {
      returnDocument: "after"
     } )
     console.log("user before update", user)
    res.send("user updated successfully!!!")
  }catch{
    res.status(400).send("something went wrong!!!")
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




