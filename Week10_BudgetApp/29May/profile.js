var profileAcctName     = document.getElementById("profileAcctName");
var userName            = document.getElementById("userName");
var email               = document.getElementById("email");
var currentBudgetTitle  = document.getElementById("currentBudgetTitle");
var close2              = document.getElementById("close2")
                        ? document.getElementById("close2")
                        : "";


function showProfileName(){
    //update when the login hass been completed to compare login username to the ones saved in credentials
    profileAcctName.innerText = `Lestat de Lioncourt`;
}

showProfileName();

function showUserName() {
    //update when the login hass been completed to compare login username to the ones saved in credentials
    userName.innerText = `@crazyForOpera`
}

showUserName();

function showEmail() {
    //update when the login hass been completed to compare login username to the ones saved in credentials
    email.innerText = `crazyForOpera@gmail.fr`
}

showEmail();

function showCurrentBudgetTitle() {
    currentBudgetTitle.innerText = `Budget: Household`
}

showCurrentBudgetTitle();

close2.addEventListener("click", ()=> {
    window.location.replace("budget.html");
});




