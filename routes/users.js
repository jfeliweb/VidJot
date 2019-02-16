const express = require('express'),
      mongoose = require('mongoose'),
      router = express.Router();

// User login route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// User register route 
router.get('/register', (req, res) => {
  res.render('users/register');
});

module.exports = router;