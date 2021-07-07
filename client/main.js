function beforeLogin() {
  $("#login-container").show();

  $("#home-container").hide();
  $("#home-container").hide();
  $("#add-container").hide();
}

function afterLogin() {}

$(document).ready(() => {
  if (localStorage.getItem("access_token")) {
    afterLogin();
  } else {
    beforeLogin();
  }
});
