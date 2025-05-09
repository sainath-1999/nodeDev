const express = require("express");
const connectDB = require("./config/database");
const app = express(); ///creating new web server
const bcrypt = require("bcrypt");
const User = require("./models/user");
const { validateSignUpData } = require("./util/validation");

app.use(express.json());

//we should never trust the req.body

app.post("/login", async (req, res) => {
  try{
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("Invalid Credentials!!!")
    }

    const passwordIsMatched = await bcrypt.compare(password, user.password)

    if(passwordIsMatched){
      res.send("Login successful!!!")
    } else {
      throw new Error("Invalid credentials!!!")
    }
  }catch(error){
    res.status(400).send("Error: "+ error.message)
  }
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

app.get("/user", async (req, res) => {
  // const userEmail = req.body.emailId;

  try {
    const users = await User.find({});
    if (users === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch {
    res.status(400).send("Unavailable to send the data!!!");
  }
});

app.get("/getUser", async (req, res) => {
  const email = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: email });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch {
    res.status(400).send("user unavailable!!!");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body?.userId;
  try {
    await User.findByIdAndDelete({ _id: userId });

    res.send("User deleted successfully");
  } catch {
    res.status(400).send("something went wrong!!!!");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATE = ["userId", "skills", "gender", "about", "photoUrl"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed!!!");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user updated successfully!!!");
  } catch (error) {
    res.status(400).send("UPDATE FAILED:" + error.message);
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
