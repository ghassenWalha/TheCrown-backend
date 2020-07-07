const {
    Product
} = require('./models/product');
const {
    data
} = require('./datat');
const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db'); 


mongoose.connect('mongodb://localhost/crown',{ useNewUrlParser: true , useUnifiedTopology: true,  useCreateIndex: true, } )
  .then(() => dbDebugger('connected to mongodb'))
  .catch(err => dbDebugger('could not connect to mongodb ' + err));



  async function saveData(){
      for (doc of data){
       try {
        let product = new Product(doc);
        let result = await product.save();
        console.log(result);
       } catch (error) {
           console.log(error);
       }
      }
  }
  saveData();