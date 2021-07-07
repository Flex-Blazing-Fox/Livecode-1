$(document).ready(() => {
    isLogedIn()

    $("#login-container").on('submit',(e) => {
        e.preventDefault()
        login()
    })

    $("#btn-login").on('click',(e) => {
        e.preventDefault()
        login()
    })

})

const isLogedIn= () => {
    if(localStorage.getItem(access_token)) {

        $("#login-container").hide()
        $("#wishlists-container").hide()
        $("#home-container").show()
    } else {
        $("#login-container").show()
        $("#wishlists-container").hide()
        $("#home-container").hide()
    }
}

const login = () => {
    const email = $('#login-email').val()
    const password = $('#login-password').val()

    $.ajax({
        URL: "http://localhost:8080/",
        method: 'POST',
        data: {
            email,
            password
        }
    })
    .done(data => {
        const {access_token} = data
        localStorage.setItem('access_token', access_token)
        $('#login-email').val('')
        $('#login-password').val()
    })
    .fail(err => {
        console.log(err)
    })
}