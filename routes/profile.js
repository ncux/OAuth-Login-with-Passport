const express = require('express');
const router = express.Router();

function checkIfAuthenticated(req, res, next) {
    if (!req.user) { res.redirect('/auth/login'); }
    else { next(); }
}

router.get('/', checkIfAuthenticated, (req, res) => res.render('profile', {title: req.user.username, user: req.user}));


module.exports = router;
