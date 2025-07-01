const express=require('express');
const app=express();

const { adminAuth }=require("./middlewares/Auth")

app.use("/admin", adminAuth
    );
app.get("/admin/userAllaAta",(req,res)=>{
res.send("successfull");
});
app.listen(3000, ()=>{
    console.log("server is succesfully running on port 3000");
} );    