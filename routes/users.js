const _ = require('lodash');
const bcrypt = require('bcrypt');


const {
    User,
    validate
} = require('../models/user');
const router = require('express').Router();

//signup
router.post('/', async (req, res) => {
    const {
        password,
        email,
        name
    } = req.body;
    console.log(name);
    const {
        error
    } = validate({
        password: password,
        email: email,
        name: name
    });

    if (error) return (res.status(400).send(error.details));


    let user = await User.findOne({
        email: req.body.email
    });

    if (user) return res.status(400).send('user already registered');

    console.log(req.body);
    user = new User(_.pick(req.body, ['name', 'email', 'password']));


    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);


    try {
        await user.save();
    } catch (ex) {

        return res.send(ex.message);
    }
    const token = user.generateAuthToken();


    return res.header('x-auth-token', token).
    header("access-control-expose-headers","x-auth-token").
    send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;