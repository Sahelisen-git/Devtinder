const mongoose=require('mongoose');

const connectionRequestSchema =new mongoose.Schema({
       fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true, //since mandatory feild
       },
       toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
       },
       status :{
        type: String,
        required: true,
        enum :{
              values : ["ignore" ,"interested", "accepted","rejected"],
              message : '{VALUE} is incorrect status type'
        },
       },
},
{ timestamps: true }
);  

 connectionRequestSchema.index({ fromUserId : 1, toUserId : 1});
 connectionRequestSchema.pre("save",function(next){
      const ConnectionRequest=this;
      //check if the fromUserId is same as toUserId
      if(ConnectionRequest.fromUserId.equals(ConnectionRequest.toUserId)){
            throw new Error("Cannot Send connection request to yourself");
      }
      next();
 });
 const ConnectionRequestModel = new mongoose.model(
       "connectionRequest" ,
       connectionRequestSchema
 );
 module.exports= ConnectionRequestModel;
