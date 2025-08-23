
const validator=require('validator');
const  validateSignUpdata= (req) =>{ //validate the req body from here
  const {firstName,lastName,EmailId,password} =req.body;
   if(!firstName || !lastName){
    throw new Error("Enter the valid name");
   }
   else if(!validator.isEmail(EmailId)){
    throw new Error("Enter the valid Emailid");
   }
   else if(!validator.isStrongPassword(password)){
    throw new Error("Enter the valid password");
   }
};

module.exports={
validateSignUpdata,
};