const express=require('express');
const app=express();

app.get("/userAllaAta",(req,res)=>{
    throw new Error("gygjhg");
res.send("successfull");
});
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went Wrong");
    }
});
app.listen(3000, ()=>{
    console.log("server is succesfully running on port 3000");
} );    