const express = require("express");
const connectDB = require("./config/database");
const app = express(); //creating new web server

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
