const express = require('express');
const shopApp = express();
const ShopService = require('../services/ShopService')

/*
GET SHOP ORDERS BY SHOPNAME OR ID
@PARAM SHOP_NAME(STR)
@PARAM id(int)
PROTECTED ROUTE
*/
shopApp.get('/products/:shopname',async(req,res)=>{
    const shopname= req.params;
    console.log(shopname);
    try {
        const shop = await ShopService.getShopInfo(shopname.shopname);
        const orders = await ShopService.getOrders(shop.id);
        res.status(200)
        res.json(orders);
    }
    catch(e){
        res.json({err:e.toString()})
    }
  
    
})
shopApp.get('/orderItems/:id',(req,res)=>{
    const {id} = req.params;
    ShopService.getOrderItems(id)
    .then(data=>{
        res.json(data)
    })
    .catch(e=>{
        console.log(e)
        res.json({message:'failed'});
    })
})
/*
    CREATE A STORE
    @params name(str);
    @params email(str);
    @params password(str);
    @params description (str);
    @params type(str);

*/
shopApp.post('/',(req,res)=>{
    const shop = req.body;
    ShopService.createshop(shop)
    .then(_=>{
        res.json({message:`created shop ${shop.shopname}`,success:true});
    })
    .catch(e=>{
        res.json({success:false,message:`failed to create shop, check your inputs`})
    })
})

shopApp.delete('/',(req,res)=>{
    const {shopname} = req.body;
    ShopService.deleteshop(shopname)
    .then(_=>{
        res.json({success:true,message:`deleted shop with ${shopname}`});
    })
    .catch(e=>{
        console.log(e);
        res.json({success:false,message:'something went wrong'})
    })
})

shopApp.put('/',(req,res)=>{
    const shop = req.body;
    ShopService.updateShop(shop)
    .then(_=>{
        res.json({message:'sucessfully updated'})
    })
    .catch(e=>{
        console.log(e);
        res.json({success:false,message:'something went wrong'})
    })
})

shopApp.get('/:shopname',(req,res)=>{
    const {shopname} = req.params;
    // console.log(shopname)
    ShopService.getShopInfo(shopname)
    .then(shop=>{
        res.json(shop)
    })
    .catch(e=>{
        console.log(e);
        res.json({success:false,message:'something went wrong'})
    })
    
})
module.exports = shopApp;