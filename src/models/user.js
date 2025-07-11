const mongoose=require('mongoose');
const validator=require('validator');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, //to check the mandatory requirements
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  EmailId: {
    type: String,
    required: true, 
    unique: true,       //Unique check there should be one person with one emailid can sign up
    lowercase: true,    //all the letter should be stored  in lower case flag in the databse
    trim: true  , 
     validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address"+value);
      }
    },     //no space take in DB
  },
  password: {
    type: String,
    required: true,
    // minlength : 4, // password should be minimum length of 4 char(only for type string we can use this flag)
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Enter a strong password"+value);
      }
    }, 
  },
  age: {
    type: Number,
    min :18, //only apply for number
  },
  gender: {
    type: String,
    validate(value){
      if( !['Male', 'Female', 'Other'].includes(value)){
        throw new Error("Gender is not valid");
      }
    },             //custom validation function(where we can apply  custom checks) if can only work for new document if we update /patch any  existing data it willl not work bt default for that e have to on runvalidators in patch api
    
  },
  photoUrl: {
    type: String,
    default : "https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid photo URL"+value);
      }
    }, 

  },
  About: {
    type: String,
    default :"This is the default about of user",
  
  },
  Skills: {
    type: [String], //array of string for multiple slills 
    
  }
},{
  timestamps:true
});
 


 const User =mongoose.model("User",userSchema);
 module.exports= User;