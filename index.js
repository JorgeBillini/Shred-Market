const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const userApp = require('./routes/user')
// MIDDLEWARE HERE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ROUTES HERE

app.get('/test',(req,res)=>{
    res.json('App is running')
})
app.use('/user',userApp);

app.listen(port,()=>{
    console.log('Now listening on ', port)
})