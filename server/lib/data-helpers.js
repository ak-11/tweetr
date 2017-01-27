"use strict";

module.exports = function makeDataHelpers(db) {
  const tweeter = db.collection('tweeter')
  return {
    // Function to insert new posts into the database
    saveTweet: (newTweet, callback) => {
      tweeter.insert(newTweet, (err, result) => {
        if (err) {
          return console.error(err);
        }
        callback(null, console.log('Tweet save successful.'));
        db.close;
      })
    },
    // Function to find all posting tweets from the database
    getTweets: (callback) => {
      tweeter.find().toArray((err, result) => {
        if (err) {
          return console.error(err);
        }
        callback(null, result);
        db.close;
      })
    }
  };
}
