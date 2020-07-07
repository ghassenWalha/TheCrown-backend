const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const config = require('config');
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:2,
        maxlength:255 
    },
    email:{
        type:String,
        required:true,
        maxlength:255,
        unique:true

    },
    password:{
        type:String,
        required:true,
        maxlength:1024
    },
    card:{
        type:[String],

    }
});
userSchema.methods.generateAuthToken = function () {
    return   jwt.sign({_id:this._id,name:this.name,email:this.email },config.get('jwtPrivateKey'));
}
const User = mongoose.model('User', userSchema);



function validateUser(user)
{
    const complexityOptions = {
        min:8,
        max:30,
        lowerCase:1,
        upperCase:1,
        symbol:1,
        requirementCount: 2,

    };


    const schema = {
        name:Joi.string().min(4).required().max(255),
        email:Joi.string().required().max(255),
        password:Joi.string().required().max(255),
    }

   const validation =  Joi.validate(user,schema);
   passwordValidation = passwordComplexity(complexityOptions,"password").validate(user.password);

    if(! passwordValidation.error) return validation;

    passwordValidation.error.details =  passwordValidation.error.details.map(detail => 
        {
            detail.path = "password" ;
            return detail;
        });
        console.log(passwordValidation);

    if(validation.error) 
   {
     
       validation.error.details= validation.error.details.concat(passwordValidation.error.details);
    return( validation);
   }
   console.log(passwordValidation);
    return (passwordValidation);
   
}



function validateAuth(user)
{

    const schema = {
        name:Joi.string().min(4).max(255),
        email:Joi.string().max(255),
        password:Joi.string().required().max(255),
    }

   return Joi.validate(user,schema);
   
   
}

exports.validate= validateUser;
exports.validateAuth = validateAuth;
exports.User = User;