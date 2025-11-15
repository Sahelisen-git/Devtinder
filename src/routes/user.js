const express =require('express');
const { contains } = require('validator');
const userRouter = express.Router();
 const {userAuth}=require("../middlewares/Auth");
 const connectionRequest= require("../models/connectionRequest");

//get all the pending connetion requests for the logged in user
userRouter.get("/user/requests/received" ,userAuth,async(req,res)=>{
    try{
        const loggedInUser= req.user._id;

        const connectionRequests=await connectionRequest.find({
          /*  $or:[
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted"}

            ],*/
            toUserId: loggedInUser, 
            status: "interested"

        }).populate("fromUserId", "firstName lastName photoUrl Skills About"); //finding all the connection requests for the logged in user
        res.json({
            message: "Connection requests fetched successfully",
            data: connectionRequests,
        });
    }
    catch(err){
        res.status(400).send("Error"+err.message);
    }
}
);
module.exports= userRouter;