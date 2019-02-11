const express = require('express');

const app = express();

// Index Route
app.get('/', (req, res) => {
  res.send('This the home page')
});

app.get('/about', (req, res) => {
  res.send('About page')
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});