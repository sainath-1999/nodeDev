const express = require('express')

const app = express(); ///creating new web server 


//if we not specify the path then it always gives the same result
app.use("/home", (req,res) => {
    res.send("Hello from the server...")
})

app.use("/hello", (req,res)=> {
    res.send("hello from the dashboard")
})

app.get("/abc*d", (req,res) => {
    res.send({f_n: "sainath", l_n: "devisetty"})
})

app.post("/user", (req,res) => {
    //send the data to DB
    res.send( "Data successfully saved to database!!!");
})

app.delete("/user", (req, res) => {
    //delete data from the db
    res.send("Deleted successfully");
})


app.listen(7777, () => {
    console.log("server is successfully created and listing on the port 7777...");
    
})

