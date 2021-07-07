
function login(el){
    const email = $( "#email-login" ).val();
    const password = $( "#password-login" ).val();
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/login",
        data: { email,password}
      })
      .done(()=>{

      })
    }
    
function isLogin(){
    el.preventDefault()
    $("#btn-logout").show()
    $("#home-container").show()

}

$( document ).ready(function() {
    $("#btn-login").submit(login)
});