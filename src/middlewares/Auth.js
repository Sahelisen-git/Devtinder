const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth=async (req,res,next) =>{
 try{
 const  cookies= req.cookies;
  const {token}=cookies; //extract the token from the cookie
  //validate the token
  if(!token){
   throw new Error("Invalid Token");
  }
   const decodedObj= await jwt.verify(token, "DEV@Tinder$790");
    const {_id} =decodedObj; // fetching Id from decoded Message
    
 const user = await User.findById(_id);
 if(!user){
   throw new Error("User does not exist");
 }
 req.user=user;
 next();
}
catch(err){
    res.status(400).send("error in the user " + err.message);
 }
 };
  module.exports={
    userAuth,
  };