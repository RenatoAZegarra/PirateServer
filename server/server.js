const express = require('express');
const path = require('path'); 
const cors = require('cors')

const app = express();


// middleware
app.use(cors(), express.json(), express.urlencoded({ extended: true }), express.static(path.join(__dirname, 'client', 'build')));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// load .env vars
require('dotenv').config()
// access the .env vars
const port = process.env.PORT

// Require / import the file
require("./config/mongoose.config")

// require the routes here to run
require("./routes/pirate.routes")(app)


app.listen(port, () => console.log(`Listening on port ${port} for REQuests to RESpond to.`));