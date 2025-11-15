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

userRouter.get("/user/connections" ,userAuth,async(req,res)=>{
try{
    const loggedInUser= req.user;

    const connectionRequests=await connectionRequest.find({

        $or:[
            { toUserId: loggedInUser, status: "accepted" }, //if logged in user is the toUserId and status is accepted
            { fromUserId: loggedInUser, status: "accepted"}
        ],
    }).populate("fromUserId", "firstName lastName photoUrl Skills About").populate("toUserId", "firstName lastName photoUrl Skills About"); //fetching the user details of both fromUserId 
     const data= connectionRequests.map((row) => {
         if(row.fromUserId.toString() === loggedInUser._id.toString()){
            return row.toUserId;
        }
            return row.fromUserId;
         }); //mapping through the connection requests and returning the user details of the connected user
    res.json({
        data
    });
} catch(err){
    res.status(400).send("Error"+err.message);
}
});
module.exports= userRouter;