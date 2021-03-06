/////////////////////////////
////// Dependencies  ////////
/////////////////////////////
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcrypt');
require('dotenv').config();


/////////////////////////////
//////// APP Consts  ////////
/////////////////////////////
const APP = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI

/////////////////////////////
/////// Controllers  ////////
/////////////////////////////
const gamesController = require('./controllers/boardgames.js');
const userController = require('./controllers/users.js');
const sessionController = require('./controllers/sessions.js');

/////////////////////////////
///// Database Config ///////
/////////////////////////////
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

/////////////////////////////
/////// Middleware  /////////
/////////////////////////////
APP.use(express.urlencoded({extended: true}));
APP.use(methodOverride('_method'));
APP.use(express.static('public'));
APP.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
  }


/////////////////////////////
///// Controller Use  ///////
/////////////////////////////
APP.use('/games', gamesController);
APP.use('/users', userController);
APP.use('/sessions', sessionController);

/////////////////////////////
///////// Routes  ///////////
/////////////////////////////

APP.get('/', (req, res) => {
    res.redirect('/games');
})

APP.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})