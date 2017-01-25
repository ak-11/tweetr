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
 let td = tweet
 let postDate = calculatePostDate(td.created_at)
 let $tweet = `<article class="tweet">
   <header>
     <img src="${escape(td.user.avatars.small)}">
     <h2 class="username">${escape(td.user.name)}</h2>
     <h5 class="handle">${escape(td.user.handle)}</h5>
   </header>
   <div class="tweet-content">
     ${escape(td.content)}
   </div>
   <footer>
    <span>
     <div class="post-date">${escape(postDate)}</div>
     <i class="fa fa-flag" aria-hidden="true"></i>
     <i class="fa fa-retweet" aria-hidden="true"></i>
     <i class="fa fa-heart" aria-hidden="true"></i>
    </span>
   </footer>
 </article>`
 return $tweet;
}

const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    $( '#tweets-container').append(createTweetElement(tweet))
  })
}

// Shortcut for document on ready
// $(function () {
//
// })
// renderTweets(data)
$(document).ready(() => {
  $('#new-tweet-submit').on('submit', function(){
    event.preventDefault;
    // Send form data and serialize it
    $.post('/tweets', $('#tweet-form').serialize());

    // let content = $('#new-tweet').val();
    // let date = Date.now();
    // $.post('/tweets', {
    //   'content': {
    //     'text': content
    //     }
    // }).done(function(data) {
    //   console.log("Success! Here is the data:", data);
    // })

  })
})
