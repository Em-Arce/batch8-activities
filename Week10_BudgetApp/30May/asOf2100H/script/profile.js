


//PROFILE
let bankAccountList;
var profileAcctName     = document.getElementById("profileAcctName");
var userName            = document.getElementById("userName");
// var email               = document.getElementById("email");
var currentBalance  = document.getElementById("currentBalance");
var currentBudgetTitle  = document.getElementById("currentBudgetTitle");

var close2              = document.getElementById("close2")
                        ? document.getElementById("close2")
                        : "";

var addNewBudgetTitle   = document.getElementById("addNewBudgetTitle");

//FOOTER
let addBtn           = document.getElementById("addBtn") 
                     ? document.getElementById("addBtn") 
                     : "";

//BUILD NEW BUDGET MODAL

var nameNewBudget;
    
//buttons
const saveNewBudget     = document.getElementById("saveNewBudget")
                        ? document.getElementById("saveNewBudget")
                        : "";
const refreshNewBudget = document.getElementById("refreshNewBudget")
                       ? document.getElementById("refreshNewBudget")
                       : "";



function hideModal() {
    //hide set new budget modal
    document.getElementById("modalContainer").style.display = "none";
    
}

// hideModal();

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

//LOGIN PAGE
function isLoggedIn() {
    let userList = HandleLocalStorage.getUserList();

    let isLoggedIn = userList.find(user => user.loggedIn == true)
                   ? userList.find(user => user.loggedIn == true)
                   :"";
    // console.log(isLoggedIn)
    return isLoggedIn;
}

function showProfileName(){
    let loggedUser = isLoggedIn();
    profileAcctName.innerText = `${loggedUser.accountName}`;
}

showProfileName();

function showUserName() {
    let loggedUser = isLoggedIn();
    userName.innerText = `${loggedUser.userName}`
}

showUserName();

// function showEmail() {
//     let loggedUser = isLoggedIn();
//     email.innerText = `${loggedUser.email}`
// }

// showEmail();

function showCurrentBudgetTitle() {
    let loggedUser = isLoggedIn();
    currentBudgetTitle.innerText = `${loggedUser.currentBudget}`
}

showCurrentBudgetTitle();

function showCurrentBalance() {
    //get details of logged user
    let loggedUser = isLoggedIn();
    
    //getbankAccountList from LS
    getOrCreateBankAccountList();
    convertToInt();
    
    //compare logged user to the list in bankaccount, return first match
    let userBankDetail = bankAccountList.find(account => account.accountName == loggedUser.accountName);

    console.log(userBankDetail.accountBalance)
  
    //get list of expenses from LS
    let expenseList = HandleLocalStorage.getExpenseItems();
    console.log(expenseList)

    let totalCost = 0;
    
    //get sum of all expenses
    expenseList.forEach(expense => {
        //show total amount spent
        totalCost += parseInt(expense.cost);
        console.log(totalCost)
    });

    let updatedBalance;
  
    //calc difference between accountbalance and total cost
    updatedBalance = userBankDetail.accountBalance - totalCost;

    console.log(updatedBalance)
  
    updatedBalance = accounting.formatMoney(parseInt(updatedBalance), {symbol: "₱" ,precision: 0, thousand: ",", format: "%s%v"});
    console.log(updatedBalance)

    currentBalance.innerText = `Current Balance: ${updatedBalance}`
}

showCurrentBalance();

addNewBudgetTitle.addEventListener("click", () => {
    document.getElementById("modalContainer").style.display = "block";
})

//FOR BUILD NEW BUDGET MODAL
saveNewBudget.addEventListener("click", (event)=> {
    event.preventDefault();

    let nameNewBudget = document.getElementById("nameNewBudget").value;
    
    let loggedUser = isLoggedIn();

    let userList = HandleLocalStorage.getUserList();
    
    
    let loggedUserIndex = userList.findIndex(user => user.accountNumber == loggedUser.accountNumber)
                        // ? userList.findIndex(user => user.accountNumber == loggedUser.accountNumber)
                        //  : "";

    //create new budget to the loggedUser
    loggedUser.currentBudget = `${nameNewBudget}`

    userList.splice(loggedUserIndex,1,loggedUser);
    
    localStorage.setItem("userList", JSON.stringify(userList));

    alert(`Set new budget success!`);

    window.location.replace("budgetEditBudgetPage.html");

});


//close3.addEventListener("click", ()=> {
//     hideModal();
// });

close2.addEventListener("click", function () {
    window.location.replace("budget.html");
});

//FOOTER

addBtn.addEventListener("click", function () {
    window.location.replace("budgetAddExpense.html");
});





///FOR TEST PURPOSES

//1. FOR ACCOUNT AND TRANSACTION LIST OBJECTS
// let bankAccountList;
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

// console.log(bank);

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

    /////////END OF FOR TEST////////////////////////////////////////    







