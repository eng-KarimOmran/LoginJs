var Email = document.getElementById("email");
var Password = document.getElementById("password");
checkedLogin = false
var Users = []
Users = JSON.parse(localStorage.getItem("Users"));
document.getElementById("bt-signUp").addEventListener('click',function(e){
    e.preventDefault();
    window.location.href='../html/signup.html';
})
document.getElementById("bt-SinIn").addEventListener('click',function(e){
    e.preventDefault();
    for(var i = 0;i < Users.length;i++){
        if(Email.value == Users[i].Email && Password.value == Users[i].Password ){
            var userlogin = i;
            checkedLogin = true
            sessionStorage.setItem("userlogin",JSON.stringify(userlogin));
            window.location.href='../html/Home.html';
            break;
        }else{
            checkedLogin = false
        }
    }
        if(checkedLogin == false){
            document.getElementById("feedbackUserPass").classList.replace("d-none","d-block")
        }           
})