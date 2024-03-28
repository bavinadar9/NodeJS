const express= require("express");

const app= express();  // app is an instance of express

app.get("/", (req,res)=>{
    res.send("Hello welcome to the HomePage!! ");
});

app.get("/about", (req,res) => {
    res.send(`Hi, ${req.query.username}. Your are now ${req.query.age}. Welcome to About Page `);
});

app.listen(8000, () => console.log("Server started!! "));