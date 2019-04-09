const {db} = require('./db-service');
const ShopService = {};
/*
`SELECT 
        posts.post_author, posts.post_img, posts.post_text, comments.comment_author, comments.comment_text 
    FROM posts JOIN comments 
        ON 
    posts.id = comments.post_id WHERE comments.post_id = $[post_id]`




*/
ShopService.getShopInfo = (shop_handle,id) => {
    let sql; 
    if (id) {
        sql = `SELECT * FROM shops WHERE id=$[id]`;
    }
    else sql = `SELECT * FROM shops WHERE shop_handle = $[shop_handle];
    `
    return db.one(sql,{shop_handle});
}
ShopService.getProducts = (id) => {
    return db.any(`SELECT * FROM products WHERE shop_id= $[id]`,{id});
}
ShopService.isShop = (firebase_id) => {
    return db.one(`SELECT * FROM SHOPS WHERE firebase_id=$[firebase_id]`,{firebase_id});
}
ShopService.createshop = (shop) =>{
    const {shop_handle,email,password,type,description,firebase_id} = shop;
    const sql = `INSERT INTO shops(shop_handle,email,password,type,description,firebase_id) values ($[shop_handle],$[email],$[password],$[type],$[description],$[firebase_id]);`
    return db.none(sql,{shop_handle,email,password,type,description,firebase_id});
}
ShopService.deleteshop = (shop_handle) => {
    const sql = `DELETE FROM shops WHERE shop_handle = $[shop_handle];
    `
    return db.none(sql,{shop_handle});
}
ShopService.updateShop = (shop) => {
    console.log(shop)
    const {shop_handle, newshop_handle, newEmail, newPassword} = shop
    let sql = '';
    if(newPassword){
        sql = `UPDATE shops 
        SET password = $[newPassword]
        WHERE 
        shop_handle=$[shop_handle] `;

    }
    else if(newshop_handle){
        sql = `UPDATE shops 
        SET shop_handle = $[newshop_handle]
        WHERE 
        shop_handle = $[shop_handle] `;

    }
    
    else if(newEmail){
        sql = `UPDATE shops 
        SET email = $[newEmail]
        WHERE 
        shop_handle = $[shop_handle] `;
        
    }
   else if(newPassword){
        sql = `UPDATE shops 
        SET password = $[newPassword]
        WHERE 
        shop_handle=$[shop_handle] `;

    }
    return db.none(sql,{shop_handle,newEmail,newPassword});

}
ShopService.getOrderItems = shopid => {
    const sql = `SELECT name, amount, specs,id
    FROM products
    JOIN  order_item ON shopid=$[shopid];`;
     return db.any(sql,{shopid});
}
module.exports = ShopService;
