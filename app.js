const express = require('express'),
  exphbs = require('express-handlebars'),
  methodOverride = require('method-override'),
  flash = require('connect-flash'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');


const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

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



// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Express Session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Connect Flash Middleware
app.use(flash());

// Global Variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



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





// Use routes
app.use('/ideas', ideas);
app.use('/users', users);


// SERVER CONNECTION
const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});