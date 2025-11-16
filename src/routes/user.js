const express =require('express');
const { contains } = require('validator');
const userRouter = express.Router();
 const {userAuth}=require("../middlewares/Auth");
 const connectionRequest= require("../models/connectionRequest");
    const User = require("../models/user");

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

// User should see all the user cards except
// his own card
//his connections
//ignored  users
//already sent connection requests
userRouter.get("/feed", userAuth, async (req,res)=> {
    try{

        const loggedInUser= req.user;
         const page= parseInt(req.query.page) || 1;
         let limit= parseInt(req.query.limit) || 10;
         limit= limit > 50 ? 50 : limit; //max limit is 50
         const skip= (page -1) * limit;
        // find all connections  requests(sent+recevied) of the logged in user
        const connectionRequests= await connectionRequest.find({
            $or:[
                { toUserId: loggedInUser._id },
                { fromUserId: loggedInUser._id}
            ],
        })
        .select("fromUserId toUserId");

        const hideUsersFeed= new Set();
             connectionRequests.forEach((req) => {
            hideUsersFeed.add(req.fromUserId.toString());
            hideUsersFeed.add(req.toUserId.toString());
        });

         //fetching only fromUserId and toUserId fields
         const users= await User.find({
            $and:[
                { _id: { $ne: loggedInUser._id } }, //excluding his own card
                { _id: { $nin: Array.from(hideUsersFeed) } }, //excluding his connections and ignored users and already sent connection requests
            ],
         }).select("firstName lastName photoUrl Skills About").skip(skip).limit(limit); //fetching only required fields
         res.send(users);
    }catch(err){
        res.status(400).send("Error"+err.message);
    }
});
module.exports= userRouter;