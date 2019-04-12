const express = require('express');
const shopApp = express();
const ShopService = require('../services/ShopService')

/*
GET SHOP ORDERS BY SHOPNAME OR ID
@PARAM SHOP_NAME(STR)
@PARAM id(int)
PROTECTED ROUTE
*/
shopApp.get('/isShop/:firebase_id',async(req,res)=>{
    const {firebase_id} = req.params;
    try {
        const  shop_info =await ShopService.isShop(firebase_id);
        if (shop_info){
            res.json({
                isShop: true,
                shop_info: shop_info
            })
        }
    }
    catch (e) {
        res.json({
            isShop: false
        })
    }
  


})
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
        console.log(e.toString())
        res.json({message:'failed',err:e.toString()});
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
        res.json({success:false,message:`failed to create shop, check your inputs`,e:e.toString()})
    })
})

shopApp.delete('/',(req,res)=>{
    const {shop_handle} = req.body;
    ShopService.deleteshop(shopname)
    .then(_=>{
        res.json({success:true,message:`deleted shop with ${shop_handle}`});
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

shopApp.get('/:id' ,(req,res)=>{
    console.log(req.params);
    const {id} = req.params;
    // console.log(shopname)
    
        ShopService.getShopInfo(id)
        .then(shop=>{
            res.json(shop)
        })
        .catch(e=>{
            console.log(e);
            res.json({success:false,message:'something went wrong',error:e.toString()})
        })
    

    
    
})
shopApp.get('/shopInfo/:id',(req,res)=>{
    const {id} = req.params;
    ShopService.getShopInfo(id)
    .then(shop=>{
        res.json(shop);
    })
    .catch(e=>{
        res.json({message:'failed in route/shopInfo/', error:e.toString()})
    })
})
shopApp.get('/info/all',(req,res)=>{
    ShopService.getAll()
    .then(shops =>{
        res.json(shops)
    })
    .catch(e=>{
        console.log(e.toString())
        res.json({message:'error in shops/all', error:e.toString()})
    })
})

module.exports = shopApp;