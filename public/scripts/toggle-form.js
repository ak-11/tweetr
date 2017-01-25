$(() => {
  $('#compose-button').on('click', () => {
    $('#compose').slideToggle('fast')
    $('#new-tweet').focus()
  })
})
