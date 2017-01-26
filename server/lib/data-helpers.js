"use strict";

module.exports = function makeDataHelpers(db) {
  const tweeter = db.collection('tweeter')
  return {

    saveTweet: (newTweet, callback) => {
      tweeter.insert(newTweet, (err, result) => {
        if (err) {
          return console.error(err);
        }
        callback(null, console.log('Tweet save successful.'));
        db.close;
      })
    },

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
