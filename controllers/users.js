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
        res.redirect('/sessions/new');
    })
})

USER.get('/:id', isAuthenticated, (req, res) => {
    try {
        User.findById(req.params.id, (err, user) => {
            UserGame.find({userId: user.id, played: true}, (err, playRelationship) => {
                let playedArr = playRelationship.map(i => i.gameId);
                Game.find({ _id: {$in: playedArr}}, (err, playedGames) => {
                    UserGame.find({userId: user.id, owned: true}, (err, ownedRelationship) => {
                        let ownedArr = ownedRelationship.map(i => i.gameId);
                        Game.find({ _id: {$in: ownedArr}}, (err, ownedGames) => {
                            UserGame.find({userId: user.id, wantToPlay: true}, (err, wantRelationship) => {
                                let wantedArr = wantRelationship.map(i => i.gameId);
                                Game.find({ _id: {$in: wantedArr}}, (err, wantedGames) => {
                                    res.render('users/show.ejs', {
                                        user: user,
                                        currentUser: req.session.currentUser,
                                        playedGames: playedGames,
                                        ownedGames: ownedGames,
                                        wantedGames: wantedGames
                                    })
                                })
                            })
                        })
                    })
                })
            })

        })
    } catch (error) {
        console.log(error)
    }
})

USER.put('/:id/played', (req, res) => {
    UserGame.findOne({ userId: req.session.currentUser._id, gameId: req.body.gameId}, (err, foundRelationship) => {
        if (foundRelationship) {
            UserGame.findByIdAndUpdate(foundRelationship.id, {$set: {played: true}}, {new: true}, (err, playedGame) => {
                res.redirect('/users/' + req.session.currentUser._id);
            })
        } else {
            UserGame.create({ userId: req.session.currentUser._id, gameId: req.body.gameId, played: true}, (err, createdGame) => {
                res.redirect('/users/' + req.session.currentUser._id);
            })
        }
    })
})

USER.put('/:id/owned', (req, res) => {
    UserGame.findOne({ userId: req.session.currentUser._id, gameId: req.body.gameId}, (err, foundRelationship) => {
        if (foundRelationship) {
            UserGame.findByIdAndUpdate(foundRelationship.id, {$set: {owned: true}}, {new: true}, (err, ownedGame) => {
                res.redirect('/users/' + req.session.currentUser._id);
            })
        } else {
            UserGame.create({ userId: req.session.currentUser._id, gameId: req.body.gameId, owned: true}, (err, createdGame) => {
                res.redirect('/users/' + req.session.currentUser._id);
            })
        }
    })
})

USER.put('/:id/wantToPlay', (req, res) => {
    UserGame.findOne({ userId: req.session.currentUser._id, gameId: req.body.gameId}, (err, foundRelationship) => {
        if (foundRelationship) {
            UserGame.findByIdAndUpdate(foundRelationship.id, {$set: {wantToPlay: true}}, {new: true}, (err, wantToPlayGame) => {
                res.redirect('/users/' + req.session.currentUser._id);
            })
        } else {
            UserGame.create({ userId: req.session.currentUser._id, gameId: req.body.gameId, wantToPlay: true}, (err, createdGame) => {
                res.redirect('/users/' + req.session.currentUser._id);
            })
        }
    })
})

module.exports = USER


