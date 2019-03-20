const express = require('express');
const userApp = express();
const UserService = require('../services/UserService')

/*
    Protected Routes should utilize some auth middleware to allow users to 
    alter/modify data, right now users are able to modify data without auth
    middleware which is a potential security threat

*/
// PROTECTED ROUTES
/*
PRIVATE
ROUTE METHOD : GET
DESC : GET USERS INFO
@PARAMS(STR): USERNAME
*/
userApp.get('/:username',(req,res)=>{
    const {username} = req.params;
    UserService.getBuyerInfo(username)
    .then(user =>
       res.json(user)
    )
    .catch(e => {
        res.json({err: e.toString()})
    })
})
/*
ROUTE METHOD : GET
DESC : GETS BUYERS ORDERS
@PARAM ID: INT TAKES BUYERS ACCOUNT ID IN POSTGRES
OUTPUT : ORDERS ARRAY 
*/
userApp.get('/:id/orders',(req,res)=>{
    const {id} = req.params;
    UserService.getOrders(id)
    .then(data =>{
        res.json(data)
    })
    .catch(err => {
        res.status(200)
        res.json({message:'no data found'})
    });

})
userApp.delete('/',(req,res) => {
    const {username}= req.body;
    UserService.deleteBuyer(username)
    .then(response =>{
        res.status(200);
        res.json({message:`sucessfully deleted user ${username}`})
    })
    .catch(e =>{
        res.status(407)
        res.json({message:`something went wrong`,
        err: e.toString()})
    })
})
/*
    ENDPOINT TYPE : PUT
    ROUTE: /USERS/
    PARAMS : USERNAME || EMAIL || PASSWORD
    DESC: MODIFY user information in SQL ROW
*/
userApp.put('/',(req,res)=>{
    const user = req.body;
    // if (user.username === '' || user.username ==='undefined' || !user.newEmail || !user.newPassword){
    //     res.json({message:'invalid input'})
    // }
    UserService.updateBuyer(user)
    .then(_=>{
        res.json({message:`successfully updated user ${user.username}`})
    })
    .catch(e =>{
        res.json({error:e.toString()})
    })


})
//PUBLIC ROUTE  
/*
    ROUTE CREATE USER 
    @PARAMS username: UNIQUE STR CONTAINING USERNAME
    @PARAMS email: UNIQUE STR CONTAINING EMAIL
    @PARAMS password:  password str 
    TODO: implement bcrypt to passwords
*/
userApp.post('/',(req,res)=>{
    const user = req.body
    UserService.createbuyer(user)
    .then
    (_=>{
        res.status(200)
        res.json({message: `sucessfully created user ${user.username}`});
    })
    .catch(e =>{
        console.log(e)
        res.status(406)
        res.json({message:'failed'})
    })
})


module.exports = userApp;