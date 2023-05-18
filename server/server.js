const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Load .env vars
const port = process.env.PORT || 3000;

// Require / import the file
require('./config/mongoose.config');

// Require the routes here to run
require('./routes/pirate.routes')(app);

app.listen(port, () => console.log(`Listening on port ${port} for requests to respond to.`));