const navBar = document.getElementById("navBar");
var signUp = document.getElementById("signUp");
var accountNumberLogin;  
var passWordLogin;       
var loginBtn = document.getElementById("loginBtn");
var fullName;
var accountNumber;
var email;
var userName;
var passWord;

let close3             = document.getElementById("close");
let saveSignUp            = document.getElementById("saveSignUp");
let refreshSignUp         = document.getElementById("refreshSignUp");


//STYLE FOR HEADER LOGO
navBar.style.display ="block";
navBar.style.textAlign ="center";
navBar.style.marginBottom ="2rem";

//Methods to manage local Storage
class HandleLocalStorage{
    static getUserList(){
        let userList = JSON.parse(localStorage.getItem("userList"))
                        ? JSON.parse(localStorage.getItem("userList"))
                        : [];

        return userList;

    }

    static addUser(user){
        
        let userList = HandleLocalStorage.getUserList();
        
        // console.log(userList);

        userList.push(user);

        localStorage.setItem("userList", JSON.stringify(userList));
        
        // console.log(userList);
        
    }

    static findActiveUser(accountNumber){
        let userList = HandleLocalStorage.getUserList();
        
        let activeUser = userList.find(user => user.accountNumber == accountNumber)
                       ? userList.find(user => user.accountNumber == accountNumber)
                       : " ";

        console.log(activeUser);

        return activeUser;
    }

    static getBudgetItems(){
        let budgetItems = JSON.parse(localStorage.getItem("budgetItems"))
                        ? JSON.parse(localStorage.getItem("budgetItems"))
                        : [];
        
        return budgetItems;

    }

    static getExpenseItems(){
        let expenseItems = JSON.parse(localStorage.getItem("expenseItems"))
                         ? JSON.parse(localStorage.getItem("expenseItems"))
                          : [];
        
        return expenseItems;

    }

    static addExpense(expense){
        let expenseItems = HandleLocalStorage.getExpenseItems();
        
        // console.log(expenseItems);

        expenseItems.push(expense);

        localStorage.setItem("expenseItems", JSON.stringify(expenseItems));
        
        // console.log(expenseItems);

    }

}

//Class User
class User{
    constructor(name,accountNumber, userName, email, password){
        this.accountName = name;
        this.accountNumber = accountNumber;
        this.userName = userName;
        this.email  = email;
        this.passWord = password;
        this.loggedIn = false;
        this.currentBudget = "";
    }
}

//Class Budget

class Budget{
    constructor(name, accountNumber,userName,categoryName,budgetAmount){
        this.accountName   = name;
        this.accountNumber = accountNumber;
        this.userName      = userName;
        this.categoryName  = categoryName;
        this.budgetAmount  = budgetAmount;
    }
}

//Class Expense
class Expense{
    constructor(date, name, accountNumber,userName,categoryName,cost, frequency){
        this.date          = date;
        this.accountName   = name;
        this.accountNumber = accountNumber;
        this.userName      = userName;
        this.categoryName  = categoryName;
        this.cost          = cost;
        this.frequency     = frequency;
    }
}


loginBtn.addEventListener("click", (event) => {
    event.preventDefault();

     var accountNumberLogin = document.getElementById("accountNumberLogin").value;
     var passWordLogin      = document.getElementById("passWordLogin").value;

    checkLoginCred(accountNumberLogin,passWordLogin);

});

function checkLoginCred(accountNumberLogin,passWordLogin) {
    let userList = HandleLocalStorage.getUserList();
    let activeUserIndex = userList.findIndex(user => user.accountNumber == accountNumberLogin)
                        ? userList.findIndex(user => user.accountNumber == accountNumberLogin)
                        : "";
    
    let activeUser = HandleLocalStorage.findActiveUser(accountNumberLogin);
    
    if(accountNumberLogin == activeUser.accountNumber  && passWordLogin === activeUser.passWord){
        //change login status to true
        activeUser.loggedIn = true;

        alert(`Welcome, ${activeUser.userName}`);

        userList.splice(activeUserIndex, 1, activeUser);

        localStorage.setItem("userList", JSON.stringify(userList));

        window.location.replace("profile.html");
    } else{
        alert(`Wrong account number or password.`);
        window.location.reload();
    }
}

//checkLoginCred(1622352969914, "12345678a");

signUp.addEventListener("click", (event)=>{
    event.preventDefault();
    modalContainer.style.display = "block";
});

saveSignUp.addEventListener("click", (event) => {
    event.preventDefault();

    var fullName      = document.getElementById("fullName").value;
    var accountNumber = document.getElementById("accountNumber").value;
    var email         = document.getElementById("email").value;
    var userName      = document.getElementById("userName").value;
    var passWord      = document.getElementById("passWord").value;

    let user1 = new User(fullName, accountNumber, email, userName, passWord);

    console.log(user1);

    HandleLocalStorage.addUser(user1);
    
    goToThisPage();

});

function goToThisPage() {
    window.location.reload();
}

refreshSignUp.addEventListener("click", (event) => {
    event.preventDefault(); 
    window.location.reload();
})


///FOR TEST PURPOSES

//1. FOR ACCOUNT AND TRANSACTION LIST OBJECTS
let bankAccountList;
let transactionList;

//get bankAccountList from local storage if bank is not yet in LS, create new object
function getOrCreateBankAccountList(){
    bankAccountList =  JSON.parse(localStorage.getItem("bankAccountList"))
        ? JSON.parse(localStorage.getItem("bankAccountList"))
        : [];
}

getOrCreateBankAccountList();

function getOrCreateTransactionList(){
    transactionList = JSON.parse(localStorage.getItem("transactionList"))
                    ? JSON.parse(localStorage.getItem("transactionList"))
                    : [];
}

getOrCreateTransactionList();

function convertToInt(){
    var i;

    for(i=0; i < bankAccountList.length; i++){
        bankAccountList[i].accountBalance = parseInt(bankAccountList[i].accountBalance)
    }
}

//1. CREATE BANK CONSTRUCTOR
function Bank(name, accountList, transactionList){
    this.bankName           = name;
    this.bankAccountList    = accountList;
    this.transactionList    = transactionList;
}

 //2. CREATE BANK INSTANCE 
let bank = new Bank("Omega Bank", bankAccountList, transactionList);

console.log(bank);

bank.create_user = function create_user(user, balance){

    getOrCreateBankAccountList();
    getOrCreateTransactionList();
    let date           = new Date(); 
    
    //find if the input name already exists in local storage; if there is no existing name in LS return as empty to prevent error
    let checkName      = bankAccountList.find(account => account.accountName === user)
                       ? bankAccountList.find(account => account.accountName === user)
                       : " ";

    //check if name starts with num
    if(user.match(/^\d/)){
        // alert(`${user} starts with a number! Please enter valid name that starts with a letter.`)
        // startWithNumModal.style.display = "block";
    }else if( balance < 0){
        // alert(`Initial deposit amount cannot be negative! Please enter a number equal to or greater than 0.`)
        // negativeNumModal.style.display = "block";
    } else if(checkName.accountName === user){
        // alert(`Account already exists!`) 
        // existsModal.style.display = "block";
        
    } else{

        //1. create new account instance
        const account = {
            accountNumber       :  Date.now(),
            accountName         :  user,
            accountBalance      :  balance,
        }
        
        //1.a. add the new account to bankAccountList array
        bankAccountList.push(account);
        

        //1.b confirm deposit successful via message prompt
        //alert(`Account created for ${user} with initial balance of ${balance}.`);
        // successModal.style.display = "block";

        //1.c save changes to bank object to the local Storage
        localStorage.setItem("bankAccountList", JSON.stringify(bankAccountList));

        //2. create transaction List array to push details into during withdraw send deposit
        const transaction = {
                accountName     :  user,
                Date            : `${date}`,
                Type            : `Open`,
                Description     : `Account open with initial deposit of Php ${balance}.`,
                Amount          : balance,
                CurrentBalance  : balance
            }

        transactionList.push(transaction);
        localStorage.setItem("transactionList", JSON.stringify(transactionList));

        }
    }

bank.create_user("Lestat de Lioncourt", 1000000);
bank.create_user("Mekare", 50000);
bank.create_user("Jesse", 20000);
bank.create_user("Juan", 500000);
