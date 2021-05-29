let userList;
let budgetItems = [];
let modalContainer     = document.getElementById("modalContainer");
// let newBudget          = document.querySelectorAll("form");
let amount;           //= document.getElementById("amountNewBudget").value;

    //amount           = accounting.formatMoney(parseInt(amount), {symbol:"Php",precision: 0, thousand: ",", format: "%s%v"});
    
let categoryName;      // = document.getElementById("categoryNameNewBudget").value;
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
        
        console.log(budgetItems);

        budgetItems.push(budget);
        
        alert("Add budget item success!");

        console.log(budgetItems);

        localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
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

// let user1 = new User("Juan dela Cruz", 123456789,"_juan1", "jdc@gmail.com", "12345a");

// HandleLocalStorage.addUser(user1);

// console.log(user1);

//date = new Date().toDateString(); //Wed May26 2021

//add expense or budget
saveBtn.addEventListener("click", function (event) {
    
    event.preventDefault(); 
    let amount             = document.getElementById("amountNewBudget").value;
    let categoryName       = document.getElementById("categoryNameNewBudget").value;

    
    if(amount <= 0){
        alert("Amount cannot be negative or zero!");
    } else if (categoryName===null ||categoryName==="" ||categoryName=== undefined){
        alert("Category cannot be empty!");  
    } else {
        // console.log(`input value: ${categoryName} type: ${typeof categoryName}`);
        // console.log(`input value: ${amount} type: ${typeof amount}`);
        let budget1 = new Budget("Juan dela Cruz",123456789,"_juan1", categoryName, amount);
       
        HandleLocalStorage.addBudget(budget1);  
    }
        
});

//close modal or return to budget page 
close.addEventListener("click",() =>{
    // modalContainer.style.display = "none";
    window.location.replace("budgetEditBudgetPage.html");
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

