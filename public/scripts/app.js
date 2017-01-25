/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = (str) => {
 let div = document.createElement('div');
 div.appendChild(document.createTextNode(str));
 return div.innerHTML;
}

const calculatePostDate = (postDate) => {
  let present = Date.now()
  let days = Math.floor((present - postDate) / 86400000)
  if (days < 1) {
    return `Posted today`
  } else if (days <= 1) {
    return `Posted ${days} day ago`;
  } else {
    return `Posted ${days} day's ago`;
  }
}

const createTweetElement = (tweet) => {
 let postDate = calculatePostDate(tweet.created_at)
 let $tweet = `<article class="tweet">
   <header>
     <img src="${tweet.user.avatars.small}">
     <h2 class="username">${escape(tweet.user.name)}</h2>
     <h5 class="handle">${escape(tweet.user.handle)}</h5>
   </header>
   <div class="tweet-content">
     ${escape(tweet.content.text)}
   </div>
   <footer>
    <div class="post-date">${escape(postDate)}</div>
    <span>
      <i class="fa fa-flag icon" aria-hidden="true"></i>
      <i class="fa fa-retweet icon" aria-hidden="true"></i>
      <i class="fa fa-heart icon" aria-hidden="true"></i>
    </span>
   </footer>
 </article>`
 return $tweet;
}

const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    $('#tweets-container').append(createTweetElement(tweet))
  })
}

const loadTweets = () => {
  $('#tweets-container').empty()
  $.ajax({
    url: '/tweets',
  }).done((data) => {
    renderTweets(data)
  });
}

// Shortcut for writing document on ready
$(() => {
  loadTweets();
  // submit event handler can't be used for preventDefault
  // $('#new-tweet-submit').on('submit', (event) => {
  //   $event.target.preventDefault();
  $('#new-tweet-submit').on('click',(event) => {
    event.preventDefault();
    $.post('/tweets', $('#tweet-form').serialize()).done(loadTweets);
  })
})
