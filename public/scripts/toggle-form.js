// Toggle tweet form to submit/compose new tweets. Toggle from view when clicking on compose button.
$(() => {
  $('#compose-button').on('click', () => {
    $('#compose').slideToggle('fast')
    $('#new-tweet').focus()
  })
})
