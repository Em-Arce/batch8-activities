let userList;
let budgetItems = [];
let modalContainer     = document.getElementById("modalContainer");

let amount;           //= document.getElementById("amountNewBudget").value;
    
let categoryName;      // = document.getElementById("categoryNameNewBudget").value;
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
        
        // console.log(userList);

        userList.push(user);

        alert(`${user.userName} sign up success!`);

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

        budgetItems.push(budget);

        alert("Add budget item success!");

        localStorage.setItem("budgetItems", JSON.stringify(budgetItems));

        goTothisPage();

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

//add expense or budget
saveBtn.addEventListener("click", function (event) {
    
    event.preventDefault(); 
    // to make sure that the latest input is saved to LS else it will save the 2nd to the last input(if form is not reset or worse if form is reset it will save empty object) in firefox in chrome it will always save empty form inputs: shoutout to Mongk :))
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

