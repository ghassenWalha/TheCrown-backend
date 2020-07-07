const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');


const {
    User,validateAuth
} = require('../models/user');
const router = require('express').Router();



//signIn
router.post('/', async (req, res) => {
    const {password,email} = req.body;
    const {
        error
    } = validateAuth({
        password:password,
        email: email,
      
    });

    if (error) return (res.status(400).send(error.details[0].message));


    let user = await User.findOne({
        email: req.body.email
    });

    if (!user) return res.status(400).send('invalid email or password');


    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid email or password');


    const token = user.generateAuthToken();

    res.send(token);
});

//




module.exports = router;