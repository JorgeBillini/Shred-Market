const {
    db
} = require('./db-service');
const productService = {};
// upload product will take in a product object and deconstruct / operate on this values
// will also insert into db lol whatup

productService.uploadProduct = (product) => {
    /*
    name
    img url array
    shop_id
    amount (price ? )
    specs( JSON OBJECT ) PONDERING if it should be passed straight up as JSON or passed just as regular object
    */
    let {name,image_url_array,shop_id, amount, specs} = product; 
    const sql = `INSERT INTO products VALUES($[name],$[image_url_array],$[shop_id],$[amount],$[specs])`;
    return db.none(sql,{name,image_url_array,shop_id,amount,specs});
}

productService.deleteProduct = (product) => {
    const name = product.name;
    const id = product.id
    console.log(name,id)
    sql = `DELETE from products WHERE name=$[name] AND id=$[id]`;
    return db.none(sql,{name,id});
}

productService.updateProduct = (product) => {
    const {name,newName,newImage_url_Array,newAmount,newSpecs,shop_id} = product;
    let sql = '';
    if (newName) {
        sql=` UPDATE products 
        SET name = $[newName]
        WHERE 
        shop_id = $[shop_id] `;
    }
    if (newImage_url_Array){
        sql = `UPDATE products 
        SET image_url_array = $[newImage_url_Array]
        WHERE 
        shop_id = $[shop_id] `;

    }
    if (newSpecs){
        sql = `UPDATE products 
        SET specs = $[newSpecs]
        WHERE 
        shop_id = $[shop_id] `;

    }
    if (newAmount){
        sql = `UPDATE products 
        SET amount= $[newAmount]
        WHERE 
        shop_id = $[shop_id] `;

    }
    return db.none(sql,{newName,newImage_url_Array,newAmount,newSpecs,shop_id})
}
productService.getProduct = id => { 
    let sql = `SELECT * FROM products WHERE id=$[id]`
    return db.one(sql,{id})
}
productService.getProductsByShop = shop =>{
    const {shop_handle,shop_id} = shop;
    let sql = '';
    if(!shop_handle){
        sql = `SELECT * FROM products WHERE shop_id=$[shop_id] `
    }
    return db.any(sql,{shop_id});
}

module.exports = productService;