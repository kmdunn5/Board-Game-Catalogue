const bcrypt = require('bcrypt');
const express = require('express');
const USER = express.Router();
const User = require('../models/user.js');
const UserGame = require('../models/userGames.js');

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

USER.get('/:id', (req, res) => {
    console.log(req.session.currentUser)
    User.findById(req.params.id, (err, user) => {
        UserGame.find({ id: req.session.currentUser._id }, (err, userGames) => {
            console.log(userGames)
            res.render('users/show.ejs', {
                user: user,
                currentUser: req.session.currentUser,
                userGames: userGames
            })
        })
    })
})

module.exports = USER