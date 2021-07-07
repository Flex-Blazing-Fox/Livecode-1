function checkLogin(){
    if(localStorage.access_token){
        $('#login-container').hide()
        $('#add-container').hide()
        
        $('#btn-logout').show()
        $('#home-container').show()
    }else{
        $('#login-container').show()
        $('#add-container').show()
        
        $('#btn-logout').hide()
        $('#home-container').hide()
    }
}
$.document().ready(function(){
    checkLogin()
})