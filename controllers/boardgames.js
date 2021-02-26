const express = require('express');
const GAMES = express.Router();

GAMES.get('/', (req, res) => {
    res.send('Let\'s Play Some Games!');
})

module.exports = GAMES