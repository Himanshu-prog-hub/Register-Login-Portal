const { json } = require('body-parser');
const express = require('express');
const bcrypt = require('bcryptjs');
const route = express();


const User = require('../models/user');
const passport = require('passport');



route.get('/login',(req,res,next)=>{
    res.render('login');
    
})

route.get('/register',(req,res,next)=>{
    res.render('register');
    
})

route.get('/dashboard',function(req,res,next){
    res.render('dashboard')
})

//Register handle


route.post('/register', function(req,res){
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);
    const {name,email,password,password2} = obj;

    let errors = [];
    if(!name || !email || !password || !password2)
    {
        errors.push({msg: "Please fill all the fields"});
    }
    if(password !== password2)
    {
        errors.push({msg:"Password doesn't match"});
    }

    
    if(errors.length > 0)
    {
        
        res.render('register',{
            errors,
            name,
            email,
            password
        });
    }
    // else
    // {
    //     //Validation
    //     User.findOne({email: email})
    //     .then(user => {
    //         if(user)
    //         {
    //             errors.push({msg: "Email is already registered"});
    //             res.render('register',{
    //                 errors,
    //                 name,
    //                 email,
    //                 password,
    //                 password2
    //             });

    //         }
    //         else
    //         {
    //             const newUser = new User({
    //                 name: name,
    //                 email: email,
    //                 password: password
    //             });

    //             //Hash the password

    //             bcrypt.genSalt(10, function(err,salt){
    //                 bcrypt.hash(newUser.password,salt,function(err,hash){
    //                     if(err)throw err;
    //                     newUser.password=hash;
    //                     newUser.save()
    //                     .then(user=>{
    //                         //req.flash('success_msg','You are now registered');
    //                         res.redirect('login');
    //                     })
    //                     .catch(err => console.log(err));
    //                 })

    //             });

    //         }
    //     });
        
        
    // }


    else
    {
        //Validation
        User.findOne({email:email})
        .then(user => {
            if(user)
            {
                errors.push({msg:"Email already registered"})
                res.render('register',{
                    errors,
                    name,
                    email,
                    password
                });
            }
            else
            {
                const newuser = new User({
                    name: name,
                    email: email,
                    password: password
                })

                bcrypt.genSalt(10,function(err,salt){
                    bcrypt.hash(newuser.password,salt,function(err,hash){
                        if(err)throw err;

                        newuser.password=hash;

                        newuser.save()
                        .then(user=>{
                            //res.flash('success_msg','You have been registered');
                            res.redirect('login');
                        })
                        
                    })
                })
            }
        })
    }






});


// Login handle


route.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/user/login'
    })(req,res,next);
    
});


route.get('/logout',(req,res)=>{
    req.logOut();
    console.log('logging out');
    res.redirect('/user/login');
})

module.exports=route;