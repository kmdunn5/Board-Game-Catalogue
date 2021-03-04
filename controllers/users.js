const bcrypt = require('bcrypt');
const express = require('express');
const USER = express.Router();
const User = require('../models/user.js');
const UserGame = require('../models/userGames.js');
const Game = require('../models/boardgame.js')

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
    try {
        User.findById(req.params.id, (err, user) => {

            UserGame.find({userId: user.id}, (err, relationships) => {
                let relatedGames = relationships.map(i => i.gameId);
                console.log(relatedGames)
                Game.find( { _id: {$in: relatedGames}}, (err, foundGames) => {
                    res.render('users/show.ejs', {
                        user: user,
                        currentUser: req.session.currentUser,
                        relationships: relationships,
                        relatedGames: foundGames
                    })
                })
            })

        })
    } catch (error) {
        console.log(error)
    }
})

USER.put('/:id', (req, res) => {
    UserGame.create({ userId: req.session.currentUser._id, gameId: req.body.gameId, played: true}, (err, createdGame) => {
        res.redirect('/users/' + req.session.currentUser._id);
    })
})

module.exports = USER