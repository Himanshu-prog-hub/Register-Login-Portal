const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ExpressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');


//Mongoose connection
const db = require('./config/keys').MongoUri;


mongoose.connect(db,{
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}
).then(()=>{
    console.log("Database connected succesfully");
}).catch((err)=>{
    console.log(err);
});

// user model


//Session middleware

app.use(session({
    'secret': 'secret',
    resave:true,
    saveUninitialized:true
}))


//Passport

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

// bodyparser
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());



//View Engine 
app.use(ExpressLayout);
app.set('view engine','ejs');







//Get requests

app.use('/',require('./routes/index'));
app.use('/user',require('./routes/user'));
app.use('/user',require('./routes/user'));









// Global variables

app.use((req,res,next)=> {
    //res.locals.success_msg = req.flash('success_msg');
})





//Seting up the port
const PORT = process.env.PORT || 3000;




app.listen(3000,()=>{
    console.log( `Serever started at ${PORT}`);
})


 