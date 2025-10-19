const express =require("express");

const RequestRouter=express.Router();
const {userAuth} =require("../middlewares/Auth");

RequestRouter.post("/sendConnectionRequest", userAuth, async (req,res)=> {
 const user=req.user;
 console.log("Sending connection request");
 res.send(user.firstName + "sent the connection req");
   });
   module.exports=RequestRouter;