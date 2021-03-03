const bcrypt = require('bcrypt');
const express = require('express');
const USER = express.Router();
const User = require('../models/user.js');

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
  }


USER.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser
    });
})

USER.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, user) => {
        res.redirect('/');
    })
})

USER.get('/:id', isAuthenticated, (req, res) => {
    UserGame.find({id: req.session.currentUser.id}, (err, userGames))
    console.log
    res.render('users/show.ejs', {
        user: req.session.currentUser.id,
        userGames: userGames
    })
})

module.exports = USER