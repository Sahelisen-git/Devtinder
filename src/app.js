const express=require('express');
const app=express();
 app.use((req,res) =>{
 res.send(" moon  saheli from server");
 });

app.listen(3000, ()=>{
    console.log("server is succesfully running on port 3000");
} );    