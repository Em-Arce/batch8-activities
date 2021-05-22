    var records  = document.getElementById("records");
    var deposit  = document.getElementById("deposit");
    var openAcct  = document.getElementById("openAcct");
    var withdraw = document.getElementById("withdraw");
    var transfer = document.getElementById("transfer");
    var logout   = document.getElementById("logout");

    records.addEventListener("click", function(){
        window.location.replace("records.html");
    });

    openAcct.addEventListener("click", function(){
        window.location.replace("UI_bankAppCreateBankUser2.html");
    });

    deposit.addEventListener("click", function(){
        window.location.replace("deposit.html");
    });

    withdraw.addEventListener("click", function(){
        window.location.replace("withdraw.html");
    });

    transfer.addEventListener("click", function(){
        window.location.replace("send.html");
    });

    logout.addEventListener("click", function(){
        window.location.replace("UI_login.html");
    });