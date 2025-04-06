const express = require('express')

const app = express(); ///creating new web server 


//if we not specify the path then it always gives the result
app.use("/home", (req,res) => {
    res.send("Hello from the server")
})

app.use("/", (req,res)=> {
    res.send("hello from the dashboard")
})


app.listen(7777, () => {
    console.log("server is successfully created and listing on the port 7777...");
    
})

