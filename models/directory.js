const mongoose = require('mongoose');
const Joi = require('joi');




const Directory = mongoose.model('Directory', new mongoose.Schema({
    title: {type:String,required:true},
    imageUrl: {type:String,required:true},
    linkUrl: {type:String,required:true},
    size:{type:String},
    display:{type:Boolean,required:true}
}));


exports.Directory = Directory;