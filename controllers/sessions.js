const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');
const SESSION = express.Router();

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
  }


SESSION.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })
})

SESSION.post('/', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.send('404, we had a problem');
        } else if (!foundUser) {
            res.send('Sorry user doesn\'t exist. Please return <a href="/">home</a>');
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/')
            } else {
                res.send('Sorry user and password don\'t match. Please <a href="/session/new">try again</a>')
            }
        }
    })
})

SESSION.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
})

module.exports = SESSION;