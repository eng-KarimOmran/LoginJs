var Name = document.getElementById("name");
var Email = document.getElementById("email");
var Password = document.getElementById("password");
var RePassword = document.getElementById("re-password");
var Continue = document.getElementById("bt-Continue");
var Users = [];
var UserChecked = {
    Name : 0,
    Email : 0,
    Password : 0,
    RePassword : 0
}
if(localStorage.getItem("Users") != undefined){
    Users = JSON.parse(localStorage.getItem("Users"))
}
function GetDataUser(){
    user = {
        Name : Name.value,
        Email : Email.value,
        Password : Password.value,
    }
}
Continue.addEventListener('click',function(e){
    e.preventDefault();
    if(UserChecked.Name == 1 && UserChecked.Email == 1 && UserChecked.Password == 1 && UserChecked.RePassword == 1){
            if(localStorage.getItem("Users") == undefined){
                GetDataUser();
                Users.push(user);
                localStorage.setItem("Users",JSON.stringify(Users));
                window.location.href='../index.html';
            }
            else{
                for(var i = 0;i < Users.length;i++){
                    if(Users[i].Email != Email.value){
                        GetDataUser();
                        Users.push(user);
                        localStorage.setItem("Users",JSON.stringify(Users));
                        window.location.href='../index.html';
                        break;
                    }
                    else{
                        document.getElementById("feedbackEmailRegistered").classList.replace("d-none","d-block")
                        break;
                    }
                }
            }
    }
})
function checkedValue(Element,Regex,ck){
    function checkedRegex(){
        if(Regex.test(this.value)){
            this.classList.remove("is-invalid")
            this.classList.add("is-valid")
            UserChecked[ck] = 1;
            document.getElementById(`feedback${ck}`).classList.replace("d-block","d-none")
            if(ck=="Password"){
                if(RePassword.value == Password.value){
                    RePassword.classList.remove("is-invalid")
                    RePassword.classList.add("is-valid")
                    UserChecked["RePassword"] = 1;
                    document.getElementById(`feedbackRePassword`).classList.replace("d-block","d-none")
                }
                else{
                    RePassword.classList.remove("is-valid")
                    RePassword.classList.add("is-invalid")
                    UserChecked["RePassword"] = 0
                    document.getElementById(`feedbackRePassword`).classList.replace("d-none","d-block")
                }
            }
        }
        else{
            this.classList.remove("is-valid")
            this.classList.add("is-invalid")
            UserChecked[ck] = 0
            document.getElementById(`feedback${ck}`).classList.replace("d-none","d-block")
            if(ck=="Password"){
                if(RePassword.value == Password.value){
                    RePassword.classList.remove("is-invalid")
                    RePassword.classList.add("is-valid")
                    UserChecked["RePassword"] = 1;
                    document.getElementById(`feedbackRePassword`).classList.replace("d-block","d-none")
                }
                else{
                    RePassword.classList.remove("is-valid")
                    RePassword.classList.add("is-invalid")
                    UserChecked["RePassword"] = 0
                    document.getElementById(`feedbackRePassword`).classList.replace("d-none","d-block")
                }
            }
        }
    }
    Element.addEventListener('input',checkedRegex)
}
checkedValue(Name,/^[a-z]{2,}$/i,"Name");
checkedValue(Email,/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Email");
checkedValue(Password,/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password");
RePassword.addEventListener('input',function RePasswordfu(){
    Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(Regex.test(this.value)){
        if(this.value == Password.value){
            this.classList.remove("is-invalid")
            this.classList.add("is-valid")
            UserChecked["RePassword"] = 1;
            document.getElementById(`feedbackRePassword`).classList.replace("d-block","d-none")
        }
        else{
            this.classList.remove("is-valid")
            this.classList.add("is-invalid")
            UserChecked["RePassword"] = 0
            document.getElementById(`feedbackRePassword`).classList.replace("d-none","d-block")
        }
        document.getElementById(`feedbackRePasswordRx`).classList.replace("d-block","d-none")
    }else{
        document.getElementById(`feedbackRePasswordRx`).classList.replace("d-none","d-block")
        this.classList.add("is-invalid")
    }
})