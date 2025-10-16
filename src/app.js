const express=require('express');
 const connectDB =require("./config/Database");
const app=express();
const User =require("./models/user");
const bcrypt =require('bcrypt');
const {validateSignUpdata}= require("./utils/validation");
const cookieParser= require("cookie-parser");
const jwt=require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req,res)=> {
   //validate signup data
   try{
 validateSignUpdata(req);
   //creating new user/ insatnce of User model with this data
 //encrypting password   
  const {firstName, lastName,EmailId,password}=req.body;
  const passwordHash= await bcrypt.hash(password,10);
  console.log(passwordHash);
    const user =new User(
      {
         firstName,
         lastName,
         EmailId,
         password: passwordHash,
      }
    );
     await user.save();
res.send("User added successfully");
}
catch(err){
   res.status(400).send("ERROR: " + err.message);
}
});
app.post("/login", async (req,res)=> {
try{
   const {EmailId,password}=req.body;
     const user= await User.findOne({EmailId: EmailId});
     if(!user){
      throw new Error("EnmailId is not valid");
     }
    const ispasswordValid= await bcrypt.compare(password, user.password);
      if(ispasswordValid){
         //create a JWT token
         const token=await jwt.sign({_id: user._id },"DEV@Tinder$790");
      
         //Add the token to cookie and send the response back to user
         res.cookie("token",token);
         res.send("login Successfull");
      }
      else{
         throw new Error("Password is not correct");
      }
}
catch(err){
   res.status(400).send("ERROR: " + err.message);
}
});
app.get("/profile", async (req,res)=> {

try{
 const  cookies= req.cookies;
  const {token}=cookies; //extract the token from the cookie
  //validate the token
  if(!token){
   throw new Error("Invalid Token");
  }
   const decodedMessage= await jwt.verify(token, "DEV@Tinder$790");
    const {_id} =decodedMessage; // fetching Id from decoded Message
    
 const user = await User.findById(_id);
 if(!user){
   throw new Error("User does not exist");
 }
//  console.log(cookies);
 res.send(user);
}
catch(err){
    res.status(400).send("error in the user " + err.message);
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
