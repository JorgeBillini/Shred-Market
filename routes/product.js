const express = require('express');
const productApp = express();
const productService = require('../services/productService');
/*
    ROUTE: POST
    route is private, please add some sort of authorization to this please 
    @param name(str)
    @param img_url_array(arr)
    @param amount(int)
    @param specs (JSON)
*/
productApp.post('/',(req,res)=>{
    const product = req.body;
    productService.uploadProduct(product)
    .then(_=>{
        res.json({message: `sucessfully created product with ${product.name}`})
    })
    .catch(e => {
        res.status(403)
        res.json({message:'something went wrong please try again',
    error: e.toString()});
    }) 
});
/*
ROUTE DELETE
params
@name (str)
@id (int)
DESC: Deletes a product given the id and product name
*/
productApp.delete('/',(req,res)=>{
    let product = req.body;
    productService.deleteProduct(product)
    .then(_=>{
        res.status(200)
        res.json({message:`sucessfully deleted ${product.name} with id ${product.id}`});
    })
    .catch(e=>{
        res.status(400)
        res.json({message:'something went wrong',e:e.toString()});
    })
})
/*
ROUTE PUT
@PARAM @NAME(STR)
@PARAM @ID (INT)
DESC: updates a product info 
*/
productApp.put('/',(req,res)=>{
    let product = req.body;
    // PROB want to add a read product to get id, TBD
    productService.updateProduct(product)
    .then(newProduct=>{
       res.status(200)
       res.json(`sucessfully updated product`);
    })
    .catch(e=>{
        res.status(400)
        res.json({message:'failed',error:e.toString()})
    })
})
/* Route
GET PRODUCT BY ID
@PARAM ID
DESC: RETURNS PRODUCT BY ID
*/
productApp.get('/:id',(req,res)=>{
    const {id} = req.params;
    productService.getProduct(id)
    .then(product=>{
        res.status(200)
        res.json(product);
    })
    .catch(e =>{
        res.status(400)
        res.json({message:'failed',error: e.toString()});
    })
})
productApp.get('/shop/:shop_id',(req,res)=>{
    const shop_id = req.params
    productService.getProductsByShop(shop_id)
    .then(products =>{
        res.status(200)
        res.json(products)
    })
    .catch(e => {
        res.status(400)
        res.json({error:e.toString()})
    })
})
module.exports = productApp;