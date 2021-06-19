const express = require('express');
const route = express();
const {ensureAuthenticated} = require('../config/auth');

route.get('/',function(req,res,next){
    res.send('Welcome');
})
route.get('/dashboard',ensureAuthenticated,(req,res) => res.render('dashboard',{
    name: req.user.name
}));


module.exports=route;