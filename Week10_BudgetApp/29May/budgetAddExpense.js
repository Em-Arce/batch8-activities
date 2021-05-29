let userList;
let newExpenseOrBudget = document.getElementById("newExpenseOrBudget")
                           ? document.getElementById("newExpenseOrBudget")
                           : " ";
                    //solved the working on firefox but not in chrome bug
let amount;           // = document.getElementById("amount").value;
    //amount           = accounting.formatMoney(parseInt(amount), {symbol:"Php",precision: 0, thousand: ",", format: "%s%v"});
    
let categoryName;     //  = document.getElementById("categoryName").value;
let date               = document.getElementById("date").value;
let close              = document.getElementById("close");
let saveBtn            = document.getElementById("save");
let refreshBtn         = document.getElementById("refresh");
let clearBtn           = document.getElementById("clear"); 


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
        console.log(expense1);
    }
        
});

//show the current month and year (mmm yyyy)
function showCurrentMonth(){
    var dateToday = new Date().getDate(); //just the date today in num format
    var currentMonthString = new Date().toLocaleString('default', { month: 'short' });
    var currentYear = new Date().getFullYear();
    return `${dateToday} ${currentMonthString} ${currentYear}`;
}

//close modal or return to budget page 
close.addEventListener("click",() =>{
    // modalContainer.style.display = "none";
    window.location.replace("budget.html");
});

//reload page to make sure that the latest input is saved to LS else it will save the 2nd to the last input(if form is not reset or worse if form is reset it will save empty object) 
refreshBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.reload();
})

//clear form fields
clearBtn.addEventListener("click", (event)=>{
    event.preventDefault();

    document.querySelector("form").reset();
    console.log(document.querySelector("form"));
});

