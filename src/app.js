const express=require('express');
 const connectDB =require("./config/Database");
const app=express();
const User =require("./models/user");

app.use(express.json());

app.post("/signup", async (req,res)=> {
   //creating new user/ insatnce of User model with this data

    const user =new User(req.body);
    try{ await user.save();
res.send("User added successfully");
}
catch(err){
   res.status(400).send("error in the user" + err.message);
}
});

//get user by email
app.get("/user", async (req,res)=> {
 const Useremail=req.body.EmailId; //reading the requuest from the body what ever the email I am gettin
 try{
    const users=await User.find({EmailId : Useremail}); //finding the user from the database
    if(users.length===0){
      res.status(404).send("User not found");
    }
    else{
    res.send(users); //sending the user back
    }
 }
 catch(err){
    res.status(400).send("error in the user" + err.message);
 }

});

//  Feed API -GET/Feed-get all the users of the database(all the objects)
app.get("/feed", async (req,res)=> {
try{
    const users=await User.find({}); //finding all user from the database with empty filter {}
     res.send(users);
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
