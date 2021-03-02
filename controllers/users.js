const bcrypt = require('bcrypt');
const express = require('express');
const USER = express.Router();
const User = require('../models/user.js');

USER.get('/new', (req, res) => {
    res.send('Hello new user');
})

module.exports = USER