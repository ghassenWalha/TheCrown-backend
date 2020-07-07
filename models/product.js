const mongoose = require('mongoose');
const textSearch = require('mongoose-text-search');

const Joi = require('joi');

  const  productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    imgURL: {
      type: String,
      required: true,
      maxlength: 255
    },
    description: {
      type: String,
      
      maxlength: 1024
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    tags: [String]
  });
  productSchema.index(   {
    name:"text",
    category:"text",
    tags:"text",
    description:"text"
    },
    {
    name:"search_bar_text_index",
    weights:{
    name:4,
    category:3,
    tags:2
    }});
    productSchema.plugin(textSearch);
const Product = mongoose.model('Product',productSchema );


exports.Product = Product;