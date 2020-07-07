const  {data} = require('./shop.data');
const fs = require('fs');
const util = require('util');

const transformed =data.map((category)=> 

{

    return category.items.map(item => ({

        category:category.title,
        name:item.name,
        imgURL:item.imageUrl,
        price:item.price,
        tags:[category.title],
        description:""

    }))

}


 
   


);
let transformedTobjects = [];
for (category in transformed)
transformedTobjects = [...transformedTobjects,...transformed[category] ];


fs.writeFile('data.json',util.inspect(transformedTobjects) ,()=>{});