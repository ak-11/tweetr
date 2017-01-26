"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  const tweeter = db.collection('tweeter')
  return {

    // Saves a tweet to `db`
    saveTweet: (newTweet, callback) => {
      tweeter.insert(newTweet, (err, result) => {
        if (err) {
          return console.error(err);
        }
        callback(null, console.log('Tweet save successful.'));
      })

    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: (callback) => {
      tweeter.find().toArray((err, result) => {
        if (err) {
          return console.error(err);
        }
        callback(null, result)
        db.close;
      })
    }
  };
}
