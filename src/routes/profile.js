const express =require("express");

const profileRouter=express.Router();
const {userAuth} =require("../middlewares/Auth");
const {validateEditProfileData}= require("../utils/validation");
    
profileRouter.get("/profile/view", userAuth, async (req,res)=> {

try{
   
 const user = req.user;
 res.send(user);
}
catch(err){
    res.status(400).send("error in the user " + err.message);
 }
});

profileRouter.patch("/profile/edit", userAuth, async (req,res)=> {
 //data sanitization  & validation
 try{
    if(!validateEditProfileData(req)){
        throw new Error("Invalid edit request");
    }
    const LoggedInUser =req.user;
    

    Object.keys(req.body).forEach((key) => (LoggedInUser[key] = req.body[key]));
   
     await LoggedInUser.save();
    res.send("profile updated successfully");
 }
 catch(err){
    res.status(400).send("error in the user " + err.message);
 }
    });

module.exports=profileRouter;