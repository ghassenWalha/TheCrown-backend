
const Joi = require('joi');
const config = require('config');

Joi.objectId = require('joi-objectid')(Joi);

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db'); 


const users = require('./routes/users');
const auth = require('./routes/auth');
const products = require('./routes/products');
const directories = require('./routes/directories');
const card = require('./routes/card');

if(!config.get('jwtPrivateKey'))
{
  console.log('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/crown',{ useNewUrlParser: true , useUnifiedTopology: true,  useCreateIndex: true, } )
  .then(() => dbDebugger('connected to mongodb'))
  .catch(err => dbDebugger('could not connect to mongodb ' + err));


  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-auth-token, Content-Type, Accept");
    next();
  });


  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/card', card);
  app.use('/api/products', products);
  app.use('/api/directories', directories);

  const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
