let userList;
                    //solved the working on firefox but not in chrome bug TYYYY Mongk
let amount;           // = document.getElementById("amount").value
let categoryName;     //  = document.getElementById("categoryName").value;
let date;               //= document.getElementById("date").value;
let close              = document.getElementById("close");
let saveBtn            = document.getElementById("save");
let refreshBtn         = document.getElementById("refresh");

class HandleLocalStorage{
    static getUserList(){
        let userList = JSON.parse(localStorage.getItem("userList"))
                     ? JSON.parse(localStorage.getItem("userList"))
                     : [];
        return userList;
    }

    static addUser(user){
        
        let userList = HandleLocalStorage.getUserList();

        userList.push(user);
        
        alert(`${user.userName} sign up success!`);

        localStorage.setItem("userList", JSON.stringify(userList));
        
    }

    static getExpenseItems(){
        let expenseItems = JSON.parse(localStorage.getItem("expenseItems"))
                         ? JSON.parse(localStorage.getItem("expenseItems"))
                          : [];
        return expenseItems;
    }

    static addExpense(expense){
        let expenseItems = HandleLocalStorage.getExpenseItems();
        expenseItems.push(expense);
        alert("Add spend item success!");
        localStorage.setItem("expenseItems", JSON.stringify(expenseItems));
        goToThisPage();
    }

}

class User{
    constructor(name,accountNumber, userName, email, password){
        this.accountName = name;
        this.accountNumber = accountNumber;
        this.userName = userName;
        this.email  = email;
        this.passWord = password;
    }
}

//add frequency for budget

class Expense{
    constructor(date, name, accountNumber,userName,categoryName,cost){
        this.date          = date;
        this.accountName   = name;
        this.accountNumber = accountNumber;
        this.userName      = userName;
        this.categoryName  = categoryName;
        this.cost          = cost;
    }
}

// let user1 = new User("Juan dela Cruz", 123456789,"_juan1", "jdc@gmail.com", "12345a");

// HandleLocalStorage.addUser(user1);

// console.log(user1);

//date = new Date().toDateString(); //Wed May26 2021

//add expense or budget
saveBtn.addEventListener("click", (event) => {
    event.preventDefault(); 

    let amount             = document.getElementById("amount").value;
    let categoryName       = document.getElementById("categoryName").value;
    let date               = document.getElementById("date").value;

    if(amount <= 0){
        alert("Amount cannot be negative or zero!");
        //
    } else if (categoryName===null ||categoryName==="" ||categoryName=== undefined){
        alert("Category cannot be empty!");
    } else if(date === null ||date ===""|| date=== undefined){
        let date = showCurrentMonth();
       
        let expense1 = new Expense(date, "Juan dela Cruz",123456789,"_juan1", categoryName, amount);
       
        HandleLocalStorage.addExpense(expense1);
        
    } else {
        let expense1 = new Expense(date, "Juan dela Cruz",123456789,"_juan1", categoryName, amount);
        
        HandleLocalStorage.addExpense(expense1);
    }
        
});

//show the current month and year (mmm yyyy)
function showCurrentMonth(){
    var dateToday = new Date().getDate(); //just the date today in num type
    var currentMonthString = new Date().toLocaleString('default', { month: 'short' });
    var currentYear = new Date().getFullYear();
    return `${dateToday} ${currentMonthString} ${currentYear}`;
}

//return to budget page 
close.addEventListener("click",() =>{
    window.location.replace("budget.html");
});

function goToThisPage() {
    window.location.replace("budget.html");
}


refreshBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.reload();
})


