const express = require('express'),
      mongoose = require('mongoose'),
      router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

// Load Idea Model
require('../models/ideas');
const Idea = mongoose.model('ideas');

// Idea Index Page
router.get('/', ensureAuthenticated, (req, res) => {
  Idea.find({})
  .sort({date: 'desc'})
  .then(ideas => {
    res.render('ideas/index', {
      ideas: ideas
    });
  });
});

// Add Idea Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('ideas/add');
});

// Edit Idea Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    res.render('ideas/edit', {
      idea: idea
    });
  });
});

// Process Idea Form
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({text:'Please add a title'});
  }
  if (!req.body.details) {
    errors.push({text:'Please add a details'});
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)
    .save()
    .then(idea => {
      req.flash('success_msg', 'Video Idea Added');
      res.redirect('/ideas');
    });
  }
});

// Edit Form Process
router.put('/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save().then(idea => {
      req.flash('success_msg', 'Video Idea Updated');
      res.redirect('/ideas');
    })
  });
});

// Delete Idea
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Idea.deleteOne({_id: req.params.id}).then(() => {
    req.flash('success_msg', 'Video Idea Removed');
    res.redirect('/ideas');
  });
});



module.exports = router;