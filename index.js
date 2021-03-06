const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors')
const bodyParser = require('body-parser');
const userApp = require('./routes/user')
const productApp = require('./routes/product');
const shopApp = require('./routes/shop');
// MIDDLEWARE HERE
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// ROUTES HERE

app.get('/',(req,res)=>{
    res.json({message:'App is running',active:true})
})
app.use('/user',userApp);
app.use('/product',productApp);
app.use('/shop',shopApp);

app.listen(process.env.PORT || port,()=>{
    console.log('Now listening on ', port)
})