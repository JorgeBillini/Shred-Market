const {db} = require('./db-service');
const ShopService = {};
/*
`SELECT 
        posts.post_author, posts.post_img, posts.post_text, comments.comment_author, comments.comment_text 
    FROM posts JOIN comments 
        ON 
    posts.id = comments.post_id WHERE comments.post_id = $[post_id]`




*/
ShopService.getShopInfo = (shopname) => {
    const sql = `SELECT * FROM shops WHERE shopname = $[shopname];
    `
    return db.one(sql,{shopname});
}
ShopService.getProducts = (id) => {
    return db.any(`SELECT * FROM products WHERE shop_id= $[id]`,{id});
}
ShopService.createshop = (shop) =>{
    const {shopname,email,password,type,description} = shop;
    const sql = `INSERT INTO shops(shopname,email,password,type,description) values ($[shopname],$[email],$[password],$[type],$[description]);`
    return db.none(sql,{shopname,email,password,type,description});
}
ShopService.deleteshop = (shopname) => {
    const sql = `DELETE FROM shops WHERE shopname = $[shopname];
    `
    return db.none(sql,{shopname});
}
ShopService.updateShop = (shop) => {
    console.log(shop)
    const {shopname, newshopName, newEmail, newPassword} = shop
    let sql = '';
    if(newPassword){
        sql = `UPDATE shops 
        SET password = $[newPassword]
        WHERE 
        shopname=$[shopname] `;

    }
    else if(newshopName){
        sql = `UPDATE shops 
        SET shopname = $[newshopName]
        WHERE 
        shopname = $[shopname] `;

    }
    
    else if(newEmail){
        sql = `UPDATE shops 
        SET email = $[newEmail]
        WHERE 
        shopname = $[shopname] `;
        
    }
   else if(newPassword){
        sql = `UPDATE shops 
        SET password = $[newPassword]
        WHERE 
        shopname=$[shopname] `;

    }
    return db.none(sql,{shopname,newEmail,newPassword});

}
ShopService.getOrderItems = shopid => {
    const sql = `SELECT name, amount, specs,id
    FROM products
    JOIN  order_item ON shopid=$[shopid];`;
     return db.any(sql,{shopid});
}
module.exports = ShopService;
