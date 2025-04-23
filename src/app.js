const express = require("express");

const app = express(); ///creating new web server

const {adminAuth, userAuth} = require('./middleWare/auth')


// app.use("/route", rH, [rH2,rH3], rH4, rH5)
app.use("/admin", adminAuth)

app.post("/user/login", (req,res) => {
    res.send("user logged in successfully!!!")
})


app.get("/admin/getAllData", (req,res) => {
    console.log("we are able to get the data of the admin");
    res.send("the Admin data displayed successfully");
})

app.get("/user", userAuth, (req,res) => {
    console.log("we are getting the user data");
    res.send("user data fetched successfully");
})

app.use("/", (err,req,res,next) => {
    if(err){
        res.status(500).send("Internal server error!!!")
    }
})

app.get("/userData", (req,res) => {
    throw new Error("jcdnsjbv");
    res.send("user data sent")
})

app.use("/", (err,req,res,next) => { // wild card to error handling to catch the unhandled error
    if(err){
        res.status(500).send("Internal server error!!!")
    }
})


app.listen(7777, () => {
  console.log("server is successfully created and listing on the port 7777...");
});
