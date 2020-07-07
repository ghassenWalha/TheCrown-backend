const {
    User, 
} = require('../models/user');
const {
    Product
} = require('../models/product');
const router = require('express').Router();
const auth = require('../middleware/auth');


router.put('/:id', auth, async (req, res) => {
    const { email } = req.user;
    const { id } = req.params;
    console.log(id);



    let user = await User.update({
        email
    }, { $push: { card: id } });
   user = await User.findOne({
        email
    });
    res.send(user);

});

router.delete('/:id', auth, async (req, res) => {
    const { email } = req.user;
    const { id } = req.params;

    let user = await User.update({
        email
    }, { $pull: { card: id } });
   user = await User.findOne({
        email
    });
    res.send(user);
    


});

router.get('/', auth, async (req, res) => {
    const { email } = req.user;
   
   
    let user = await User.findOne({
        email
    });
    console.log(user.card);
    let products = await Product.find({_id:{$in:user.card}})
    console.log(products.length);
    res.send(products);
    


});




module.exports = router;