var profile = document.getElementById("profile");
var bankAccounts = document.getElementById("bankAccounts");
var budget      = document.getElementById("budget");
var loginOutSignUp = document.getElementById("loginOutSignUp");

profile.addEventListener("click", ()=>{
    window.location.replace("../profile.html");
});

bankAccounts.addEventListener("click", ()=>{
    window.location.replace("../account.html");
});

budget.addEventListener("click", ()=>{
    window.location.replace("../budget.html");
});

loginOutSignUp.addEventListener("click", ()=>{
    window.location.replace("../login.html");
});