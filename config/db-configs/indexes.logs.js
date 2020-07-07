db.products.createIndex(
    {
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
    }
    );
    