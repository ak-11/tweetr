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
    $('#tweets-container').prepend(createTweetElement(tweet))
  })
}

const loadTweets = () => {
  $('.warning').hide()
  $('#new-tweet').val('')
  $('#counter').text(140)
  $('#tweets-container').empty()
  $.ajax({
    url: '/tweets',
  }).done((data) => {
    renderTweets(data)
  });
}

const validateTweet = (tweet) => {
  if (tweet === '' || tweet === null) return '#null-warning'
  if (tweet.length > 140) return '#limit-warning'
  return true;
}
// Shortcut for writing document on ready
$(() => {
  $('#compose').hide()
  loadTweets();
  $('#new-tweet-submit').on('click',(event) => {
    event.preventDefault();
    let text = $('#new-tweet').val()
    if (validateTweet(text) === true) {
      $.post('/tweets', $('#tweet-form').serialize()).done(loadTweets);
    } else {
      $(validateTweet(text)).show()
    }
  })
})
