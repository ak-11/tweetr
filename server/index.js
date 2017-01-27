require('dotenv').config();
// Basic express setup:
const PORT          = process.env.PORT; 
const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();
const sass          = require('node-sass');
const MongoClient   = require('mongodb').MongoClient;
const MONGODB_URI   = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// Connection to the Mongo Database
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  // Datahelpers export function for making GET and POST requests to the database for finding all
  // submitted tweets and insert new tweets into the database
  const DataHelpers  = require('./lib/data-helpers.js')(db);
  // DataHelpers functions need to be exported to server routes
  const tweetsRoutes = require('./routes/tweets')(DataHelpers);

  app.use('/tweets', tweetsRoutes);
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
