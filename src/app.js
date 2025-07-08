const express=require('express');
 const connectDB =require("./config/Database");
const app=express();
const User =require("./models/user");

app.post("/signup", async (req,res)=> {
   //creating new user/ insatnce of User model with this data

    const user =new User({
      firstName: "Pratik",
      lastName : "das",
      EmailId : "pratikdas@gmail.com",
      password : "pratik1234"
    });
    try{ await user.save();
res.send("User added successfully");
}
catch(err){
   res.status(400).send("error in the user" + err.message);
}
});
 
connectDB()
 .then(()=>{ // This will return us a promise
  console.log("DataBase connection is established"); //Happy case
  app.listen(3000, ()=>{
    console.log("server is succesfully running on port 3000");
} );    
 })
 .catch((err)=>{
    console.error("DataBase connection is not established");  //sad case
 });
