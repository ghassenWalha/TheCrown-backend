const router = require('express').Router();
const {
    Product
} = require('../models/product');


router.post('/', async (req, res) => {
    const {
        name,
        imgURL,
        description,
        price,
        category,
        tags
    } = req.body;

    product = new Product({
        name,
        imgURL,
        description,
        price,
        category,
        tags
    });

    try {
        console.log(product.name)
        const result = await product.save();
        res.send(result);

    } catch (ex) {


        console.log(ex.message);
    }


});




router.get('/:category', async (req, res) => {

    const {

        pageNumber,
        pageSize,
        search
    } = req.query;
    const {category} = req.params;
   
    const products = await Product.find({category})
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
      //  console.log(products);
    res.send(products);
});
router.get('/:category/:id', async (req, res) => {

    const {

        pageNumber,
        pageSize,
        search
    } = req.query;
    const {category} = req.params;
   
    const products = await Product.find({category})
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        // console.log(products);
    res.send(products);
});

router.get('/', async (req, res) => {

    const {
        search
    } = req.query;
 if(search){
    const products = await Product.find({ name: { $regex: search ,$options:'i'} });
        // console.log(products.length);
    res.send(products);}
});


module.exports = router;