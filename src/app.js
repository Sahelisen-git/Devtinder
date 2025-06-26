const express=require('express');
const app=express();

app.get("/user",(req,res)=> {
    res.send({firstnmae:"SAHELI",lastname:"Sen"})
});
app.post("/user",(req,res)=>{
    //data succcessfully save to DB
    res.send("data succcessfully save to DB");
});
 app.delete("/user",(req,res)=>{
    res.send("deleted succeessfully");
 });
 app.use("/hello",(req,res) =>{
 res.send(" moon  saheli from server");
 });
// app.use("/",(req,res) =>{
//  res.send(" hello hello");
//  });

app.listen(3000, ()=>{
    console.log("server is succesfully running on port 3000");
} );    