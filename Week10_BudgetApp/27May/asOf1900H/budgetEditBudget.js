let userList;
let modalContainer = document.getElementById("modalContainer");
let newExpenseOrBudget = document.getElementById("newExpenseOrBudget")
                           ? document.getElementById("newExpenseOrBudget")
                           : " ";
let amount             = document.getElementById("amount").value;
    //amount           = accounting.formatMoney(parseInt(amount), {symbol:"Php",precision: 0, thousand: ",", format: "%s%v"});
    
let categoryName       = document.getElementById("categoryName").value;
let date               = document.getElementById("date").value;
let frequency          = document.getElementById("frequency").value;

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

    static getBudgetItems(){
        let budgetItems = JSON.parse(localStorage.getItem("budgetItems"))
                         ? JSON.parse(localStorage.getItem("budgetItems"))
                          : [];
        
        return budgetItems;

    }

    static addBudget(budget){
        let budgetItems = HandleLocalStorage.getBudgetItems();
        
        // console.log(expenseItems);

        budgetItems.push(budget);

        localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
        
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

class Budget{
    constructor(date, name, accountNumber,userName,categoryName,budgetAmount, frequency){
        this.date          = date;
        this.accountName   = name;
        this.accountNumber = accountNumber;
        this.userName      = userName;
        this.categoryName  = categoryName;
        this.budgetAmount  = budgetAmount;
        this.frequency     = frequency;
    }
}

// let user1 = new User("Juan dela Cruz", 123456789,"_juan1", "jdc@gmail.com", "12345a");

// HandleLocalStorage.addUser(user1);

// console.log(user1);

//date = new Date().toDateString(); //Wed May26 2021

//add expense or budget
saveBtn.addEventListener("click", (event) => {
    event.preventDefault(); 

    if(amount <= 0){
        alert("Amount cannot be negative or zero!");
        //
    } else if (categoryName===null ||categoryName==="" ||categoryName=== undefined){
        alert("Category cannot be empty!");
    } else if(date === null ||date ===""|| date=== undefined){
        date = new Date().toDateString();
        let budget1 = new Budget(date, "Juan dela Cruz",123456789,"_juan1", categoryName, amount, frequency);
       
        HandleLocalStorage.addBudget(budget1);
        
    } else {
        let budget1 = new Budget(date, "Juan dela Cruz",123456789,"_juan1", categoryName, amount, frequency);
       
        HandleLocalStorage.addBudget(budget1);
        console.log(budget1);
    }
        
});

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

