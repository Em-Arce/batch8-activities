// let userList;

//BUDGET PAGE DOM

let title1            = document.getElementById("title1");
let budgetLeftAmt1    = document.getElementById("budgetLeftAmt1");
let budgetLeftText   = document.getElementById("budgetLeftText");

let monthYear        = document.getElementById("monthYear");
let statTotSpentAmt  =  document.getElementById("statTotSpentAmt");
let statTotSpentText = document.getElementById("statTotSpentText");
let statdailyBgAmt   = document.getElementById("statdailyBgAmt");

let editBudgetBtn    = document.getElementById("editBudget");
let addBtn           = document.getElementById("addBtn") ?
                        document.getElementById("addBtn") : "";
var daysThisMonth;
let totalAllocation; 


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

function showCurrentBudgetTitle() {
    let loggedUser = isLoggedIn();
    console.log(loggedUser)
    title1.innerText = `${loggedUser.currentBudget}`
}

showCurrentBudgetTitle();

editBudgetBtn.addEventListener("click", function () {
    window.location.replace("budgetEditBudgetPage.html");
}) 

addBtn.addEventListener("click", function () {
    window.location.replace("budgetAddExpense.html");
});

//show the current month and year (mmm yyyy)
function showCurrentMonth(){
    var dateTodayJSFormat = new Date();
    var currentMonthString = dateTodayJSFormat.toLocaleString('default', { month: 'short' });
    var currentYear = dateTodayJSFormat.getFullYear();
    

    monthYear.innerText = `${currentMonthString} ${currentYear}`;

    return `${currentMonthString} ${currentYear}`;
}

showCurrentMonth();

//show total spent based on expense list, total allocation, amount left, daily budget and show expense list
function showData() {
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

    //display table of expenses
    previousTransaction += '</table>';
    
    expensesTable.innerHTML = previousTransaction;
    expensesTableContainer.style.display = "block";

    //get total Allocation
    let totalAllocation = getTotalAllocation();
    
    console.log(totalAllocation);
    //compute the amount left to spend: total allocation - total cost
    budgetLeftAmt = totalAllocation - totalCost;
    
    //format into currency: P x,xxx
    budgetLeftAmtFormatted = accounting.formatMoney(budgetLeftAmt, {symbol: "₱" ,precision: 0, thousand: ",", format: "%s%v"});
    totalCostFormatted = accounting.formatMoney(totalCost, {symbol: "₱" ,precision: 0, thousand: ",", format: "%s%v"});
    
    //display amounts in frontend
    statTotSpentAmt.innerText = totalCostFormatted;
    budgetLeftAmt1.innerText = budgetLeftAmtFormatted;   

    //compute the daily budget
    getDaysLeftInMonth(); 
    dailyBudget = (budgetLeftAmt/daysLeftInMonth); 

    //format into currency: P x,xxx
    dailyBudgetFormatted = accounting.formatMoney(dailyBudget, {symbol: "₱" ,precision: 0, thousand: ",", format: "%s%v"});
    statdailyBgAmt.innerText = dailyBudgetFormatted;
    
}

showData();

function getTotalAllocation(){
    //get total allocation
    let budgetList = HandleLocalStorage.getBudgetItems();
    let totalAllocation = 0;

    budgetList.forEach(budgetItem => {
        totalAllocation += parseInt(budgetItem.budgetAmount);
    });

    return totalAllocation;
}

//get days left
function getDaysLeftInMonth(){
    var dateTodayJSFormat = new Date();
    var currentMonth = dateTodayJSFormat.getMonth() + 1; //in JS Jan is 0
    var currentYear = dateTodayJSFormat.getFullYear();
    var daysThisMonth = new Date(currentYear, currentMonth, 0).getDate();
    var dateToday = new Date().getDate(); //just the date today in num type
    daysLeftInMonth = (daysThisMonth-dateToday) + 1;
    return daysLeftInMonth;
}













    



