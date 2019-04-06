const {db} = require('./db-service');
const UserService = {};

UserService.getBuyerInfo = (search) => {
    if (search){
        return db.one(`SELECT username, email ,created_at FROM buyers where username = $[search]`,{search});
    }
}
UserService.getOrders = (id) => {
    return db.one(`SELECT * FROM orders WHERE id = $[id]`,{id});
}
UserService.createbuyer = (user) =>{
    const {username,email,password,firebase_id} = user;
    const sql = `INSERT INTO buyers(username,email,password,firebase_id) values ($[username],$[email],$[password],$[firebase_id]);`
    return db.none(sql,{username,email,password,firebase_id});
}
UserService.deleteBuyer = (username) => {
    const sql = `DELETE FROM BUYERS WHERE username = $[username];
    `
    return db.none(sql,{username});
}
UserService.updateBuyer = (user) => {
    const {username, newUserName, newEmail, newPassword} = user
    let sql = '';
    if(newPassword){
        sql = `UPDATE buyers 
        SET password = $[newPassword]
        WHERE 
        username = $[username] `;

    }
    if(newUserName){
        sql = `UPDATE buyers 
        SET username = $[newUserr: e.toString()ername]
        WHERE 
        username = $[username] `;

    }
    if(newPassword){
        sql = `UPDATE buyers 
        SET password = $[newPassword]
        WHERE 
        username = $[username] `;

    }
    if(newEmail){
        sql = `UPDATE buyers 
        SET email = $[newEmail]
        WHERE 
        username = $[username] `;
        if(newPassword){
            sql = `UPDATE buyers 
            SET password = $[newPassword]
            WHERE 
            username = $[username] `;
    
        }
    }
    if(sql){
        return db.none(sql,{username,newEmail,newPassword});
    }
}
UserService.createOrder = order => {
    /*
    THE FUNCTION INVOKING THIS ONE, SHOULD CALL THE ABOVE FUNCTION CALLED GETUSERINFO, AND
    THE EQUIVALENT FOR THE SHOPINFO, THAT WAY WE RECEIVE THE SHOP_ID AND THE BUYER_ID PASSED UINTO
    THIS ONE.
    */
    const {buyer_info,total_amount,paymentInfo,shop_id,buyerid} = order;
    const sql = `INSERT INTO orders(buyer_info,total_amount,payment_info,buyerid,shop_id)
    VALUES ($[buyer_info],$[total_amount],$[paymentInfo],$[shop_id],$[buyerid]);`
    return db.none(sql,{buyer_info,total_amount,paymentInfo,shop_id,buyer_info,buyerid});
}
UserService.getOrderItems = buyerid => {
    const sql = `SELECT name, amount, specs,id
    FROM products
    JOIN  order_item ON user_id=$[buyerid];`;
     return db.any(sql,{buyerid});
}

module.exports = UserService;
