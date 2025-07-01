const express=require('express');
const app=express();



app.use("/user",
    (req,res,next) =>{
// res.send("route 1");
 
 next();
  console.log("server is succesfully route1");
 },
 (req,res,next) =>{
// res.send("route 2");
  console.log("server is succesfully route2");
 next();
 },
 (req,res) =>{
 res.send("route 3");
  console.log("server is succesfully route3");
 }
);

app.listen(3000, ()=>{
    console.log("server is succesfully running on port 3000");
} );    