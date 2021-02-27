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
        res.render('index.ejs', {
            games: games
        });
    });
});

// New //
GAMES.get('/new', (req, res) => {
    res.render('new.ejs');
});

// Post //
GAMES.post('/', (req, res) => {
    res.send('created')
})

// Show //
GAMES.get('/:id', (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        res.render('show.ejs', {
            game: game
        })
    })
});

// Edit //
GAMES.get('/:id/edit', (req, res) => {
    res.render('edit.ejs');
});

// Update //
GAMES.put('/:id', (req, res) => {
    res.send('update');
});

// Delete //
GAMES.delete('/:id', (req, res) => {
    res.send('deleted');
});



module.exports = GAMES