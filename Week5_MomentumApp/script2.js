//TODO: 4. Mobile responsive for font size and input span row display at screen width 774px and below
//Done 3. check output vs user story for completeness
//Done ToDO 2. (for additional functionality): add x next to list and hide when x is chosen; hint look at how + is coded to add focus/todo or quote
//DONE use onclick see line for Todolist TODO: 1. how to remove submit button upon clicking submit without using onclick in HTML doc



//------Display Current Time Start -----//
let dat = new Date()
let currentHour = dat.getHours()
let currentMinutes = dat.getMinutes()
let currentSeconds = dat.getSeconds()
let digit;

function editTime(digit){

    //check if number is single digit
    if (digit<10){
        return "0" + digit
    } else {
        return digit
    }
}

currentHour = editTime(currentHour)
currentMinutes =editTime(currentMinutes)
currentSeconds =editTime(currentSeconds)



function displayTime(){
    return document.getElementById("currentTime").innerHTML = currentHour + ":" + currentMinutes
    // return document.getElementById("currentTime").innerHTML = currentHour + ":" + currentMinutes + ":" + currentSeconds

}

displayTime()
setTimeout(displayTime, 1000)


//------Display Current Time End -----//


//----Greet based on time: Start----//

function greet () {
    
    

    let greet;

    if (currentHour < 12){
        greet = "Good morning,"
    } else if (currentHour = 12 || currentHour < 18) {
        greet = "Good day,"
    } else {
        greet = "Good evening,"
    }
    
    document.getElementById("greet").innerHTML = greet  +  userName_input.value
    // document.getElementById("greet").innerHTML = greet + userName
    // greet()
}

//----Greet based on time End----//

//Ask and store the userInfo

const userName_input=  document.getElementById("userName")


//----Add event listener to userNameForm----//

document.getElementById("userName_form").addEventListener("submit", (evnt) => {
        evnt.preventDefault()
})

//----Hide userNameForm upon submit----//
function hideUsernameForm(){
        document.getElementById("userName_form").style.display = "none"
    }

function greetAndHide (){
    greet()
    hideUsernameForm()
}

//---FOR FOCUS SECTION----//
let FocusContainer = document.querySelector("[focusListInput]")

const focusListInput = document.getElementById("focusInput")
// let FocusList = []


//create new focus item and display under Focus List
function createFocusList(){
    let newFocusItem = document.createElement("li")
    let inputFocusValue = focusListInput.value;
    newFocusItem.classList.add("focusItem")
    let txt = document.createTextNode(inputFocusValue);
    newFocusItem.appendChild(txt)

    if (inputFocusValue === null || inputFocusValue === ""){
        // alert("Invalid input. Please enter a focus") 
        document.getElementById("focusInputForm").innerHTML = "Invalid input. Please refresh then enter a focus"
    } else{
        FocusContainer.appendChild(newFocusItem)
    }


    
}

function hideFocusForm(){
    document.getElementById("focusInputContainer").style.display = "none"
}

function createFocusAndHide(){
    createFocusList()
    hideFocusForm()
}

//---FOR TODO SECTION----//
let ToDoContainer = document.querySelector("[ToDoListInput]")

const ToDoListInput = document.getElementById("ToDoInput")

//create new todo item and display under ToDo List
function createToDoList(){
    let newToDoItem = document.createElement("li")
    let inputToDoValue = ToDoListInput.value;
    let txtToDo = document.createTextNode(inputToDoValue);
    newToDoItem.appendChild(txtToDo)

    if (inputToDoValue === null || inputToDoValue === ""){
        // alert("Invalid input. Please enter a To Do")
        document.getElementById("ToDoInputForm").innerHTML = "Invalid input. Please refresh then enter a To Do"
    } else{
        ToDoContainer.appendChild(newToDoItem)
    }

    document.getElementById("ToDoInput").value = ""

    let closeMark = document.createElement("span")
    let txtForcloseMark = document.createTextNode("     \u00D7")
    closeMark.classList.add("close")
    closeMark.appendChild(txtForcloseMark)
    newToDoItem.appendChild(closeMark)

    // when close mark is clicked, todo item is removed from list
    let close = document.getElementsByClassName("close")

    let i;

    for (i=0; i<close.length; i++){
         close[i].onclick = function(){
             var parentClose = this.parentElement
            parentClose.style.display = "none"
    }
}
}

// Add a "checked" classname when clicking on a ToDo item

ToDoContainer.addEventListener("click", function(ev) {
  if (ev.target.tagName.toLowerCase() === "li") {
    ev.target.classList.toggle("checked");
  }
})




//---Quotation-----//
// var quoteInputForm = document.getElementById("quoteInput")

var quoteList = ["Don’t await the perfection of Plato’s Republic. Marcus Aurelius",
                 "Order is heaven's first law. Pope",
                "Every man I meet is my superior in some way. In that, I learn from him. Ralph Waldo Emerson",
                "The deepest urge in human nature is the desire to be important. John Dewey"]

var quoteButtonClicked = 0

//randomize quotation



function randQuote(){
    return document.getElementById("quoteDisplay").innerHTML = quoteList[Math.floor(Math.random()*quoteList.length)]
    
}

setTimeout (randQuote, 1000)
randQuote()


// document.getElementById("quoteDisplay").innerHTML =  quoteList[0]

//hide quoteInputField
// document.getElementById("quoteInput").style.display = "none"

document.getElementById("addQuoteInput").onclick = function(){
    

    let inputQuoteValue = document.getElementById("quoteInput").value

    if (inputQuoteValue === null || inputQuoteValue === ""){
        // alert("Invalid input. Please enter a To Do")
        document.getElementById("quoteInputForm").innerHTML = "Invalid input. Please refresh then enter a quotation"
    } else {

        quoteList.push(inputQuoteValue)
    
        document.getElementById("quoteDisplay").innerHTML = ""

    let i=0
    while( i <quoteList.length){
        var quoteButtonClicked =1;
        document.getElementById("quoteDisplay").innerHTML =  quoteList[i]
        i++
        document.getElementById("quoteInput").value = ""
    }
    }
}















