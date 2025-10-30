const express =require("express");

const RequestRouter=express.Router();
const {userAuth} =require("../middlewares/Auth");
 const ConnectionRequest =require("../models/connectionRequest");
 const User= require("../models/user");
RequestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=> {
  try{
     const fromUserId= req.user._id;
     const toUserId=req.params.toUserId;
     const status=req.params.status;

     const allowedStatus=["ignored", "interested"];
     if(!allowedStatus.includes(status)){
      return res.status(400).json({message: "Invalid status type:"+status});
     }
      const toUser =await User.findById(toUserId);
      if(!toUser){
        return res.status(404).json({ message : "User not found"}); //if user is not exist then it will give error
      }



     const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        {fromUserId,toUserId},
        {fromUserId:toUserId, toUserId:fromUserId},
      ],
     });
     if(existingConnectionRequest){
      return res.status(400).send({message : "Connection Request already exist"});
     }
     //save and create a new instances of connection request model
      
     const connectionRequest= new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
     });

     const data=await connectionRequest.save();
     res.json({
      message: req.user.firstName+" is "+status+" in " +toUser.firstName,
      data,
     });
  }
  catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
   });
   module.exports=RequestRouter;