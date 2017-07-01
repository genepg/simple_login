const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();

// view engine
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/game');
mongoose.Promise = global.Promise // cuz mongoose.promise is deprecated, we need the es6 promise

require('./passport')(passport);

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// express session
app.use(session({ 
    secret: 'secret',
    saveUninitialized:true,
    resave:true 
})); 

// initialize passport
app.use(passport.initialize());
app.use(passport.session()); 

app.use(flash());

app.use(require('./routes/web'))

app.use(express.static('public'));


// error handling middleware
app.use(function(err, req, res, next){
    console.log(err);
    res.status(422).send({error: err._message});
});




app.listen(4000, function(){
    console.log('listening on 4000')
});