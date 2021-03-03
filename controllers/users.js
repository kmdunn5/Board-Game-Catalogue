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

USER.get('/:id', isAuthenticated, (req, res) => {
    User.findById(req.params.id, (err, user) => {
        console.log(user.id)
        UserGame.find({userId: user.id}, (err, foundGames) => {
            console.log(foundGames)        
            res.render('users/show.ejs', {
                user: user,
                currentUser: req.session.currentUser,
                userGames: foundGames
            })
        })

    })
})

USER.put('/:id', (req, res) => {
    // let userGameRelationship = UserGame.find({ userId: req.session.currentUser._id, gameId: req.body.gameId});
    // console.log(userGameRelationship);
    // res.render(userGameRelationship);
    UserGame.create({ userId: req.session.currentUser._id, gameId: req.body.gameId, played: true}, (err, createdGame) => {
        res.redirect('/users/' + req.session.currentUser._id);
    })
})

module.exports = USER