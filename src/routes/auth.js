const express =require("express");
const {validateSignUpdata}= require("../utils/validation");
const User =require("../models/user");
const bcrypt =require('bcrypt');

const authRouter=express.Router();

authRouter.post("/signup", async (req,res)=> {
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

authRouter.post("/login", async (req,res)=> {
try{
   const {EmailId,password}=req.body;
     const user= await User.findOne({EmailId: EmailId});
     if(!user){
      throw new Error("Invalid credentials");
     }
    const ispasswordValid= await user.validatePassword(password);
      if(ispasswordValid){
         //create a JWT token
         const token= await user.getJWT();
      
         //Add the token to cookie and send the response back to user
         res.cookie("token",token,{expires :new Date(Date.now()+ 8 *3600000),

         });
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

authRouter.post("/logout", async (req,res)=> {
res.cookie("token",null,{
   expires: new Date(Date.now()),
});
 res.send("Logout Successful");
   });
module.exports=authRouter;