const router = require('express').Router();
const {
Directory} = require('../models/directory');


router.post('/', async (req, res) => {
    const { title,
    imageUrl,
    linkUrl,
    size,
    display
     
    } = req.body;

    directory = new Directory({ title,
        imageUrl,
        linkUrl,
        size,
        display
        } );

    try {
        
        const result = await directory.save();
        res.send(result);
    } catch (ex) {


        console.log(ex.message);
    }


});



router.get('/', async (req, res) => {

    const directory = await Directory.find({display:true});
       
    res.send(directory);
});



module.exports = router;