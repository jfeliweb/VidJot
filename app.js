const express = require('express'),
  exphbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');


const app = express();

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://mongo:27017/vidjot-dev', {
  useMongoClient: true
}).then(() => {
  //connected successfully
  console.log('Successfully connected to database');
}, (err) => {
  //err handle
  console.log('Not connected to database ' + err);
});

// Load Idea Model
require('./models/ideas');
const Idea = mongoose.model('ideas');

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Index Route
app.get('/', (req, res) => {
  const title = 'Welcome'
  res.render('index', {
    title: title
  });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

// Process Idea Form
app.post('/ideas', (req, res) => {
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
    res.send('Idea Sent!');
  }
});


const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});