const express = require('express');
const app = express();
const port = 3001;
// MIDDLEWARE HERE


// ROUTES HERE
app.get('/test',(req,res)=>{
    res.json('App is running')
})

app.listen(port,()=>{
    console.log('Now listening on ', port)
})