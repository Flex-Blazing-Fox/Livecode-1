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
    .done(result => {
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

    $.ajax({
        url:'http://localhost:3000/whishlist',
        method:'GET',
        headers:{
            access_token : localStorage.access_token
        }
    })
    .done(result => {
        $('#wishlists-container').append(`
            <h1 class="bg-dark p-2 rounded-sm text-center text-white">My Wishlists</h1>
            <h3 class="text-center" id="empty-wishlist">You don't have any wishlist</h3>
            <div id="wishlists" class="row my-4 px-4">
            <!-- Each of comic will have one of this card -->
            <div class="col-4 mb-4">
            <img src="${result.image_url}" class="card-img-top" alt="...">
            <div class="card text-center">
                <div class="card-body">
                <h5 class="card-title">${result.name}</h5>
                <p class="card-text">${result.price}</p>
                <button class="btn btn-dark" id="btn-delete-wl" onclick="deleteWhishlist(${result.id})" type="submit">Delete</button>
                </div>
            </div>
            </div>
            </div>
        `)
    })
    .fail(err => {
        console.log(err);
    })
}

function deleteWhishlist(id){
    $.ajax({
        url:`http://localhost:3000/whishlist/${id}`,
        method:'DELETE',
        headers:{
            access_token : localStorage.access_token
        }
    })
    .done(() => {
        afterLogn()
    })
    .fail(err => {
        console.log(err);
    })
}

function showForm(){
    $('#add-container').show()
}

function submitAdd(event){
    event.preventDefault()

    let name = $('#wl-name').val()
    let image_url = $('#wl-image').val()
    let price = $('#wl-price').val()
    let description = $('#wl-desc').val()

    $.ajax({
        url:'http://localhost:3000/whishlist',
        method:'POST',
        headers:{
            access_token : localStorage.access_token
        },
        data:{
            name,image_url,price,description
        }
    })
    .done(() => {
        let name = $('#wl-name').val('')
        let image_url = $('#wl-image').val('')
        let price = $('#wl-price').val('')
        let description = $('#wl-desc').val('')

        afterLogn()
    })
    .fail(err => {
        console.log(err);
    })
}

$(document).ready(function(){
    if(localStorage.access_token){
        afterLogn()
    }else {
        beforeLogin()
    }

    $('#btn-show-add').click("")
    $('#add-container').submit(submitAdd)
})