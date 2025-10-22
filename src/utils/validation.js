
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
const  validateEditProfileData= (req) =>{
  const allowedEditFeilds =[
    "firstName",
    "lastName",
     "photoUrl",
     "gender",
     "age",
     "About",
     "Skills"
  ]; //will just loop through this req body if all this things are matching this criteria or not
   const isEditAllowed= Object.keys(req.body).every((field) => allowedEditFeilds.includes(field));
    //it will return a boolean object,key returns age gender.. of req.body of postman and every feild is prent on the allwoed feilds or not
    return isEditAllowed;
};
module.exports={
validateSignUpdata,
validateEditProfileData,
};