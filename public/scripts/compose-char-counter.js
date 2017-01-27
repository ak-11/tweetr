// Checks character length of input inside new tweet form. Toggles class to change chracter count
// to red when max character limit is exceeded.
$(document).ready(() => {
  $('#new-tweet').on('input', (event) => {
    let characterCount = 140 - $(event.target).val().length
    $(event.target).siblings('.counter')
      .text(characterCount)
      .toggleClass('character-limit-warning', characterCount < 0)
  })
})
