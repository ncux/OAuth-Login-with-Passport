const express = require('express');
const passport = require('passport');

const router = express.Router();

// auth login
router.get('/login', (req, res) => res.render('login', {user: req.user}));

// login with Google
router.get('/google', passport.authenticate('google', { scope: ['profile']}));

// handle redirect from accounts.google.com
router.get('/google/user-info', passport.authenticate('google'), (req, res) => res.redirect('/profile'));

// logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;
