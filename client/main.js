function login(event){
    event.preventDefault()
    let email = $('#email-login').val()
    let password = $('password-login').val()

    $.ajax({
        url:'http://localhost:3000/login',
        method:'POST',
        data:{
            email,password
        }
    })
    .then(result => {
        localStorage.setItem('access_token', result.access_token)
    })
    .fail(err => {
        console.log(err);
    })
}

function beforeLogin(){
    $('#btn-logout').hide()
    $('#home-container').hide()
    $('#add-container').hide()
}

function afterLogn(){
    $('#btn-logout').show()
    $('#home-container').show()
    $('#login-container').hide()
}

$(document).ready(function(){
    beforeLogin()
})