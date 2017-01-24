
$(document).ready(() => {
  $('#new-tweet').on('input', (e) => {
    let characterCount = 140 - $(e.target).val().length
    $(e.target).siblings('.counter')
      .text(characterCount)
      .toggleClass('character-limit-warning', characterCount < 0)
  })
})
