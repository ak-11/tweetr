
$(document).ready(() => {
  $('#new-tweet').on('input', (event) => {
    let characterCount = 140 - $(event.target).val().length
    $(event.target).siblings('.counter')
      .text(characterCount)
      .toggleClass('character-limit-warning', characterCount < 0)
  })
})
