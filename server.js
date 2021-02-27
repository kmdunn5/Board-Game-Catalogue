/////////////////////////////
////// Dependencies  ////////
/////////////////////////////
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcrypt');
// require('dotenv').config();


/////////////////////////////
//////// APP Consts  ////////
/////////////////////////////
const APP = express();
const PORT = 3000;
const DBNAME = 'games';

/////////////////////////////
/////// Controllers  ////////
/////////////////////////////
const gamesController = require('./controllers/boardgames.js');

/////////////////////////////
///// Database Config ///////
/////////////////////////////
mongoose.connect('mongodb://localhost:27017/' + DBNAME, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

/////////////////////////////
/////// Middleware  /////////
/////////////////////////////
APP.use(express.urlencoded({extended: true}));
APP.use(methodOverride('_method'));
// APP.use(session({
//     secret:process.env.secret,
//     resave: false,
//     saveUninitialized: false
// }))

/////////////////////////////
///// Controller Use  ///////
/////////////////////////////
APP.use('/games', gamesController);

/////////////////////////////
///////// Routes  ///////////
/////////////////////////////

APP.get('/', (req, res) => {
    res.redirect('/games');
})

APP.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})