$(() => {
  // $('#compose-button').on('click', () => {
  //   $('#compose').toggle('display')
  //     $('#new-tweet').focus()
  // })
  // $('#compose-button').on('click', () => {
  //   $('#compose').toggle()
  //     $('#new-tweet').focus()
  // })
  $('#compose-button').on('click', () => {
    $('#compose').slideToggle('fast')
    $('#new-tweet').focus()
  })

})
