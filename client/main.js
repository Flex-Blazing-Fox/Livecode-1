function loginPage() {
  $('#login-container').show()
  $('#home-container').hide()
  $('#add-container').hide()
  $('#btn-logout').hide()
}

function homePage() {
  $('#login-container').hide()
  $('#home-container').show()
  $('#add-container').hide()
  $('#btn-logout').show()

  showCurrentSaldo()

  $.ajax({
    url: 'http://localhost:3000/wishlists',
    method: 'GET',
    headers: { access_token: localStorage.getItem('access_token') }
  })
    .done(wishlists => {
      $('#wishlists-container').empty()

      if (wishlists.length === 0) {
        $('#wishlists-container').append(`
          <h3 class="text-center" id="empty-wishlist">You don't have any wishlist</h3>
        `)
      }

      wishlists.forEach(wishlist => {
        $('#wishlists-container').append(`
          <div id="wishlists" class="row my-4 px-4">
            <div class="col-4 mb-4">
              <img src="${wishlist.image_url}" class="card-img-top" alt="${wishlist.description}">
              <div class="card text-center">
                <div class="card-body">
                  <h5 class="card-title">${wishlist.name}</h5>
                  <p class="card-text">${wishlist.price}</p>
                  <button class="btn btn-dark" id="btn-delete-wl" type="submit" onclick="onDelete(${wishlist.id})">Delete</button>
                </div>
              </div>
            </div>
          </div>
        `)
      })
    })
}

function showCurrentSaldo() {
  $('#current_saldo').empty()
  $('#current_saldo').text(`Rp. ${localStorage.getItem('saldo')}`)
}

function onDelete(id) {
  $.ajax({
    url: `http://localhost:3000/wishlists/${id}`,
    method: 'DELETE',
    headers: { access_token: localStorage.getItem('access_token') }
  })
    .done(data => {
      localStorage.saldo = data.saldo
      homePage()
    })
    .fail(({ responseJSON }) => {
      console.log(responseJSON)
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

  $.ajax({
    url: 'http://localhost:3000/login',
    method: 'POST',
    data: { email, password }
  })
    .done(data => {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('saldo', data.saldo)
      isLoggedIn()
      showCurrentSaldo()
    })
    .fail(({ responseJSON }) => {
      console.log(responseJSON)
    })
}

function showWishlist() {
  $('#add-container').show()
}

function addWishlist(e) {
  e.preventDefault()
  isLoggedIn()

  const name = $('#wl-name').val()
  const image_url = $('#wl-image').val()
  const price = $('#wl-price').val()
  const description = $('#wl-desc').val()

  $.ajax({
    url: 'http://localhost:3000/wishlists',
    method: 'POST',
    headers: { access_token: localStorage.getItem('access_token') },
    data: {
      name,
      image_url, 
      price,
      description
    }
  })
    .done(wishlist => {
      $('#wl-name').val('')
      $('#wl-image').val('')
      $('#wl-price').val('')
      $('#wl-desc').val('')
      $('#add-container').hide()
      homePage()
      let saldo = localStorage.getItem('saldo')
      saldo = parseInt(saldo)
      saldo += parseInt(price)
      localStorage.setItem('saldo',  saldo)
      showCurrentSaldo()
    })
    .fail(({ responseJSON }) => {
      $('#alert').append(`<p>${responseJSON.msg}</p>`)
    })
}

function onLoggedOut() {
  localStorage.removeItem('access_token')
  isLoggedIn()
}


$(document).ready(function () {
  isLoggedIn()

  $('#loginForm').submit(onLoggedIn)
  $('#btn-show-add').click(showWishlist)
  $('#addWishlistForm').submit(addWishlist)

  $('#btn-cancel').click(function (e) {
    e.preventDefault()
    $('#add-container').hide()
  })

  $('#btn-logout').click(onLoggedOut)
})