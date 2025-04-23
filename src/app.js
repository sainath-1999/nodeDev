const express = require("express");

const app = express(); ///creating new web server

//if we not specify the path then it always gives the same result


// app.use("/route", rH, [rH2,rH3], rH4, rH5)
app.use(
  "/route",
  (req, res, next) => {
    next();

    console.log("1st response is loaded");
  },
  (req, res, next) => {
    console.log("2nd response is loaded");
    // res.send("second response")
    next();
  },
  (hello, world, next) => {
    next();
    console.log("3rd response");
    world.send("3rd response has been sent");
  },
  (req, res, next) => {
    console.log("4th response");
    // res.send("4th resopnse has been sent")
    next();
  },
  (req, res) => {
    console.log("5th responseeee logg");
    res.send("5th response has been reported");
  }
);

app.listen(7777, () => {
  console.log("server is successfully created and listing on the port 7777...");
});
