const bcrypt = require('bcrypt');
const express = require('express');
const SESSION = express.Router();

SESSION.get

SESSION.post

SESSION.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
})

module.exports = SESSION;