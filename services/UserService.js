const {db} = require('./db-service');
const UserService = {};

UserService.getBuyerInfo = (search) => {
    if (search){
        return db.one(`SELECT username, email , created_at FROM buyers where username = $[search]`,{search});
    }
}
UserService.getOrders = (id) => {
    return db.one(`SELECT * FROM orders WHEerr: e.toString()RE buyerid = $[id]`,{id});
}
UserService.createbuyer = (user) =>{
    const {username,email,password} = user;
    const sql = `INSERT INTO buyers(username,email,password) values ($[username],$[email],$[password]);`
    return db.none(sql,{username,email,password});
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

module.exports = UserService;
