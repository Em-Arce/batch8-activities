// let userList;

//BUDGET PAGE DOM

let title            = document.getElementById("title");
let budgetLeftAmt    = document.getElementById("budgetLeftAmt");
let budgetLeftText   = document.getElementById("budgetLeftText");

let monthYear        = document.getElementById("monthYear");
let statTotSpentAmt  =  document.getElementById("statTotSpentAmt");
let statTotSpentText = document.getElementById("statTotSpentText");
let statdailyBgAmt   = document.getElementById("statdailyBgAmt");

let editBudget       = document.getElementById("editBudget");
let addBtn           = document.getElementById("addBtn") ?
                        document.getElementById("addBtn") : "";
    console.log(addBtn)
    
//ADDEXPENSEOR BUDGET MODAL FORM DOM
// let modalContainer     = document.getElementById("modalContainer");
// let newExpenseOrBudget = document.getElementById("newExpenseOrBudget")
//                            ? document.getElementById("newExpenseOrBudget")
//                            : " ";
// let amount             = document.getElementById("amount").value;
        
// let categoryName       = document.getElementById("categoryName").value;
// let date               = document.getElementById("date").value;
// let frequency          = document.getElementById("frequency").value;

// let close              = document.getElementById("close");
// let saveBtn            = document.getElementById("save");
// let refreshBtn         = document.getElementById("refresh");
// let clearBtn           = document.getElementById("clear"); 

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
    }
}

//add frequency for budget

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

//date = new Date().toDateString(); //Wed May26 2021


//add expense or budget
/*saveBtn.addEventListener("click", (event) => {
    event.preventDefault(); 

    if(amount <= 0){
        alert("Amount cannot be negative or zero!");
        //
    } else if (categoryName===null ||categoryName==="" ||categoryName=== undefined){
        alert("Category cannot be empty!");
    } else if(date === null ||date ===""|| date=== undefined){
        date = new Date().toDateString();
       
        let expense1 = new Expense(date, "Juan dela Cruz",123456789,"_juan1", categoryName, amount, frequency);
       
        HandleLocalStorage.addExpense(expense1);
        
    } else {
        let expense1 = new Expense(date.toDateString(), "Juan dela Cruz",123456789,"_juan1", categoryName, amount, frequency);
        
        console.log(date.toString());
        HandleLocalStorage.addExpense(expense1);
    }
        
});

//close modal or return to budget page 
close.addEventListener("click",() =>{
    window.location.replace("budget.html");
    printTable();
});

//reload page to make sure that the latest input is saved to LS else it will save the 2nd to the last input(if form is not reset or worse if form is reset it will save empty object) 
refreshBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.replace();
    // modalContainer.style.display = "block";

})

//clear form fields
clearBtn.addEventListener("click", (event)=>{
    event.preventDefault();

    document.querySelector("form").reset();
    console.log(document.querySelector("form"));
});
*/




addBtn.addEventListener("click", function () {
    window.location.replace("budget_addModal.html");
});


//show the amount spent based on expense list


function printTable() {
    let expenseList = HandleLocalStorage.getExpenseItems();
    let totalCost = 0;

    console.log(expenseList);

    var previousTransaction = '<table>'+
            '<tr>'+
            '<th>Date</th>'+
            '<th>Category</th>'+
            '<th>Cost</th>'+
            '</tr>';
    
        //amount           = accounting.formatMoney(parseInt(amount), {symbol:"Php",precision: 0, thousand: ",", format: "%s%v"});
    expenseList.forEach(expense => {
        previousTransaction += '<tr>'+
                    '<td>'+expense.date+'</td>'+
                    '<td>'+expense.categoryName+'</tD>'+
                    '<td>'+ accounting.formatMoney(parseInt(expense.cost), {symbol: "₱" ,precision: 0, thousand: ",", format: "%s%v"})+'</th>'+
                    '</th>'+
                    '</tr>' 
        //show total amount spent
        totalCost += parseInt(expense.cost);
       
    });

    totalCost = accounting.formatMoney(totalCost, {symbol: "₱" ,precision: 0, thousand: ",", format: "%s%v"});
    statTotSpentAmt.innerText = totalCost;

    previousTransaction += '</table>';
    console.log(previousTransaction);
    expensesTable.innerHTML = previousTransaction;
    expensesTableContainer.style.display = "block";
    
}

printTable();




    



