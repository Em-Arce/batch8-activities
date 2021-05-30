let userList;
let budgetItems = [];
let modalContainer     = document.getElementById("modalContainer");

let amount;           //= document.getElementById("amountNewBudget").value;
    
let categoryName;      // = document.getElementById("categoryNameNewBudget").value;
let close              = document.getElementById("close");
let saveBtn            = document.getElementById("save");
let refreshBtn         = document.getElementById("refresh");



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

    static addBudget(budget){
        let budgetItems = HandleLocalStorage.getBudgetItems();

        budgetItems.push(budget);

        alert("Add budget item success!");

        localStorage.setItem("budgetItems", JSON.stringify(budgetItems));

        goTothisPage();

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

// let user1 = new User("Juan dela Cruz", 123456789,"_juan1", "jdc@gmail.com", "12345a");

// HandleLocalStorage.addUser(user1);

// console.log(user1);

//add expense or budget

modalContainer.style.display = "block";

saveBtn.addEventListener("click", function (event) {
    
    event.preventDefault(); 
    // to make sure that the latest input is saved to LS else it will save the 2nd to the last input(if form is not reset or worse if form is reset it will save empty object) in firefox in chrome it will always save empty form inputs: shoutout to Mongk :))
    let amount             = document.getElementById("amountNewBudget").value;
    let categoryName       = document.getElementById("categoryNameNewBudget").value;

    let loggedUser = isLoggedIn();

    console.log(loggedUser);

    if(amount <= 0){
        alert("Amount cannot be negative or zero!");
    } else if (categoryName===null ||categoryName==="" ||categoryName=== undefined){
        alert("Category cannot be empty!");  
    } else {
        let budget1 = new Budget(loggedUser.accountName,loggedUser.accountNumber,loggedUser.userName, categoryName, amount);
       
        HandleLocalStorage.addBudget(budget1);  
    }
        
});

function isLoggedIn() {
    let userList = HandleLocalStorage.getUserList();

    let isLoggedIn = userList.find(user => user.loggedIn == true)
                   ? userList.find(user => user.loggedIn == true)
                   :"";
    // console.log(isLoggedIn)
    return isLoggedIn;
}

// //close modal or return to budget page 
close.addEventListener("click",() =>{
//     // modalContainer.style.display = "none";
     window.location.replace("budgetEditBudgetPage.html");
 });

//go back to editBudgetPage
function goTothisPage() {
    window.location.replace("budgetEditBudgetPage.html");
}


refreshBtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    window.location.reload();
})

//clear form fields
// clearBtn.addEventListener("click", (event)=>{
//     event.preventDefault();

//     document.querySelector("form").reset();
//     console.log(document.querySelector("form"));
// });

