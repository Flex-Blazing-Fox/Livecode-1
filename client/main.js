function loginPage() {
  $('#login-container').show()
  $('#home-container').hide()
  $('#add-container').hide()
}

function homePage() {
  $('#login-container').hide()
  $('#home-container').show()
  $('#add-container').hide()

  $.ajax({
    url: 'http://localhost:3000/wishlists',
    method: 'GET',
    headers: { access_token: localStorage.getItem('access_token' )}
  })
    .done(wishlists => {
      if (wishlists.length === 0) {
        $('#wishlists-container').append(`
          <h3 class="text-center" id="empty-wishlist">You don't have any wishlist</h3>
        `)
      }

      wishlists.forEach(wishlist => {
        $('#wishlists-container').append(`
          <h1 class="bg-dark p-2 rounded-sm text-center text-white">My Wishlists</h1>
          <div id="wishlists" class="row my-4 px-4">
          <!-- Each of comic will have one of this card -->
          <div class="col-4 mb-4">
            <img src="${wishlist.image_url}" class="card-img-top" alt="${wishlist.description}">
            <div class="card text-center">
                <div class="card-body">
                <h5 class="card-title">${wishlist.name}</h5>
                <p class="card-text">${wishlist.price}</p>
                <button class="btn btn-dark" id="btn-delete-wl" type="submit">Delete</button>
                </div>
            </div>
            </div>
          </div>
        `)
      })
    })

  

}

function isLoggedIn() {
  if (localStorage.getItem('access_token')) {
    homePage()
  } else {
    loginPage()
  }
}

function onLoggedIn(e) {
  e.preventDefault()
  const email = $('#email-login').val()
  const password = $('#password-login').val()
  console.log(email, password)

  $.ajax({
    url: 'http://localhost:3000/login',
    method: 'POST',
    data: { email, password }
  })
    .done(data => {
      localStorage.setItem('access_token', data.access_token)
      isLoggedIn()

      $('#current_saldo').text(`Rp. ${data.saldo}`)
    })
    .fail(({ responseJSON }) => {
      console.log(responseJSON)
    })
}


$(document).ready(function () {
  isLoggedIn()

  $('#loginForm').submit(onLoggedIn)
})