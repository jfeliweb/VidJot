const express = require('express'),
  exphbs = require('express-handlebars'),
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

// Index Route
app.get('/', (req, res) => {
  const title = 'Welcome'
  res.render('index', {
    title: title
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});