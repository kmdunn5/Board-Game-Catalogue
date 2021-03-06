const bcrypt = require('bcrypt');
const express = require('express');
const GAMES = express.Router();

const Game = require('../models/boardgame.js');
const seededGames = require('../models/seed.js');

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
  }


// Seed //
GAMES.get('/seed', isAuthenticated, (req, res) => {
    Game.create(seededGames, (err, data) => {
        res.redirect('/games');
    });
});

// Index //
GAMES.get('/', (req, res) => {
    Game.find({}, (err, games) => {
        res.render('games/index.ejs', {
            games: games,
            currentUser: req.session.currentUser
        });
    });
});

// New //
GAMES.get('/new', isAuthenticated, (req, res) => {
    res.render('games/new.ejs', {currentUser: req.session.currentUser});
});

// Post //
GAMES.post('/', (req, res) => {
    Game.create(req.body, (err, game) => {
        res.redirect('/games')
    })
})

// Show //
GAMES.get('/:id', (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        res.render('games/show.ejs', {
            game: game,
            currentUser: req.session.currentUser
        })
    })
});

// Edit //
GAMES.get('/:id/edit', isAuthenticated, (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        res.render('games/edit.ejs', {
            game: game,
            currentUser: req.session.currentUser
        });
    });
});

// Update //
GAMES.put('/:id', (req, res) => {
    Game.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, game) => {
        res.redirect(`/games/${req.params.id}`)
    })
});

// Delete //
GAMES.delete('/:id', isAuthenticated, (req, res) => {
    Game.findByIdAndDelete(req.params.id, (err, game) => {
        res.redirect('/games');
    })
});



module.exports = GAMES