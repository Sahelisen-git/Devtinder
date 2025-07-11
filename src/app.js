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
//delete a user
app.delete("/user", async (req,res)=> {
   const userId=req.body.userId;
try{
    const user=await User.findByIdAndDelete(userId); //finding all user from the database with empty filter {}
     res.send("User deleted successsfuly");
 }
 catch(err){
    res.status(400).send("error in the user" + err.message);
 }

});
//update the user
app.patch("/user/:userId", async (req,res)=> {
   const userId=req.params?.userId; //collecting userid direct from url
   const data= req.body;

try{

   const Allowed_Updates=["photoUrl","About","gender","age","Skills","password"];
   const isUpdateAllowed=Object.keys(data).every((k) => Allowed_Updates.includes(k));
   if(!isUpdateAllowed){
      throw new Error("Update not Allowed");
   }
   if(data?.Skills.length>10){
      throw new Error("skills cannot be more than 10");
   }
    await User.findByIdAndUpdate({_id:userId},data); //finding all user from the database with empty filter {}
     res.send("User updated successsfuly");
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
