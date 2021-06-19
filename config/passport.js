
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user');


module.exports = function(passport) {
    passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>{
        User.findOne({email:email})
        .then(user =>{
            if(!user)
            {
                return done(null,false,{message: 'Incorrect email'});
            }

            //Match password
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err)throw err;

                if(!isMatch)
                {
                    return done(null,flase,{message:'Incorrect password'});
                }
                else
                {
                    return done(null,user);
                }
            })
        })
        .catch(err => console.log(err));
    }));

    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        });
    });
}

