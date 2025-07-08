// const URI="mongodb+srv://Saheli1234:Saheli@2015@cluster1.nsw9uas.mongodb.net/devTinder";
const mongoose=require('mongoose');
const connectDB= async()=>{
 await mongoose.connect(
    "mongodb+srv://Saheli1234:Saheli%402015@cluster1.nsw9uas.mongodb.net/"
);
     //connect to the cluster
 };

 module.exports=connectDB;