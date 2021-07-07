function beforeLogin() {
  $("#login-container").show();

  $("#home-container").hide();
  $("#add-container").hide();
}

function afterLogin() {
  $("#home-container").show();
  $("#add-container").show();

  $("#login-container").hide();
  getWishlists();
}

function submitLogin(event) {
  event.preventDefault();

  let email = $("#email-login").val();
  let password = $("#password-login").val();

  $.ajax({
    url: "http://localhost:3000/login",
    method: "POST",
    data: {
      email,
      password,
    },
  })
    .done((data) => {
      localStorage.setItem("access_token", data.access_token);
      afterLogin();
    })
    .fail((err) => console.log(err))
    .always(() => {
      $("#email-login").val("");
      $("#password-login").val();
    });
}

function getWishlists() {
  $.ajax({
    url: "http://localhost:3000/wishlists",
    method: "GET",
    headers: {
      access_token: localStorage.access_token,
    },
  }).done((wishlists) => {
    $("#list-whistlist").empty();
    wishlists.forEach((wishlist) => {
      $("#list-whistlist").append(
        ` <div class="card-body">
        <h5 id="wishlist-title" class="card-title">${wishlist.name}</h5>
        <p id="wishlist-price" class="card-text">${wishlist.price}</p>
        <button class="btn btn-dark" id="btn-delete-wl" type="submit">Delete</button>
        </div>`
      );
    });
  });
}

$(document).ready(() => {
  if (localStorage.getItem("access_token")) {
    afterLogin();
  } else {
    beforeLogin();
  }

  $("#btn-logout").click(() => {
    localStorage.removeItem("access_token");
    beforeLogin();
  });

  $("#form-login").submit(submitLogin);
});
