let userList;
let title            = document.getElementById("title");
let budgetLeftAmt    = document.getElementById("budgetLeftAmt");
let budgetLeftText   = document.getElementById("budgetLeftText");

let monthYear        = document.getElementById("monthYear");
let statTotSpentAmt  =  document.getElementById("statTotSpentAmt");
let statTotSpentText = document.getElementById("statTotSpentText");
let statdailyBgAmt   = document.getElementById("statdailyBgAmt");

let addBudgetBtn    = document.getElementById("addBudget");
let closeBtn1         = document.getElementById("close1");
let addBtn           = document.getElementById("addBtn") ?
                        document.getElementById("addBtn") : "";

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

class Budget{
    constructor(name, accountNumber,userName,categoryName,budgetAmount){
        this.accountName   = name;
        this.accountNumber = accountNumber;
        this.userName      = userName;
        this.categoryName  = categoryName;
        this.budgetAmount  = budgetAmount;
    }
}

addBudgetBtn.addEventListener("click", function () {
    window.location.replace("budgetAddBudget.html");
}) 

addBtn.addEventListener("click", function () {
    window.location.replace("budgetAddExpense.html");
});

//show the amount spent based on expense list
function printTable() {
    let budgetList = HandleLocalStorage.getBudgetItems();
    let totalAllocation = 0;

    console.log(budgetList);

    var previousTransaction = '<table>'+
            '<tr>'+
            '<th>Category</th>'+
            '<th>Allocation</th>'+
            '</tr>';
    
        //amount           = accounting.formatMoney(parseInt(amount), {symbol:"Php",precision: 0, thousand: ",", format: "%s%v"});
    budgetList.forEach(budgetItem => {
        previousTransaction += '<tr>'+
                    '<td>'+budgetItem.categoryName+'</tD>'+
                    '<td>'+ accounting.formatMoney(parseInt(budgetItem.budgetAmount), {symbol: "₱" ,precision: 0, thousand: ",", format: "%s%v"})+'</th>'+
                    '</th>'+
                    '</tr>' 
        //show total amount allocation
        totalAllocation += parseInt(budgetItem.budgetAmount);
       
    });

    //format into currency: P x,xxx
    totalAllocation = accounting.formatMoney(totalAllocation, {symbol: "₱" ,precision: 0, thousand: ",", format: "%s%v"});
    budgetLeftAmt.innerText = totalAllocation;

    previousTransaction += '</table>';
    console.log(previousTransaction);
    budgetTable.innerHTML = previousTransaction;
    budgetTableContainer.style.display = "block";  
}

printTable();

closeBtn1.addEventListener("click", function () {
    window.location.replace("budget.html");
});



