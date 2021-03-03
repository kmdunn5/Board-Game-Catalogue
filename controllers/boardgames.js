const bcrypt = require('bcrypt');
const express = require('express');
const GAMES = express.Router();

const Game = require('../models/boardgame.js');
const seededGames = require('../models/seed.js');

// Seed //
GAMES.get('/seed', (req, res) => {
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
GAMES.get('/new', (req, res) => {
    res.render('games/new.ejs', {currentUser: req.session.currentUser});
});

// Post //
GAMES.post('/', (req, res) => {
    if (req.body.played === 'on') {
        req.body.played = true;
    } else {
        req.body.played = false;
    }
    if (req.body.wantToPlay === 'on') {
        req.body.wantToPlay = true;
    } else {
        req.body.wantToPlay = false;
    }
    if (req.body.owned === 'on') {
        req.body.owned = true
    } else {
        req.body.owned = false
    }
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
        console.log(req.session)
    })
});

// Edit //
GAMES.get('/:id/edit', (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        res.render('games/edit.ejs', {
            game: game,
            currentUser: req.session.currentUser
        });
    });
});

// Update //
GAMES.put('/:id', (req, res) => {
    if (req.body.played === 'on') {
        req.body.played = true;
    } else {
        req.body.played = false;
    }
    if (req.body.wantToPlay === 'on') {
        req.body.wantToPlay = true;
    } else {
        req.body.wantToPlay = false;
    }
    if (req.body.owned === 'on') {
        req.body.owned = true
    } else {
        req.body.owned = false
    }
    Game.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, game) => {
        res.redirect(`/games/${req.params.id}`)
    })
});

// Delete //
GAMES.delete('/:id', (req, res) => {
    Game.findByIdAndDelete(req.params.id, (err, game) => {
        res.redirect('/games');
    })
});



module.exports = GAMES