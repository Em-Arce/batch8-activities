
        //notes on duplicate empty objects in LS upon loading and submission of forms 
        //from S' martney place in function then invoke it para hindi kada load ng page ay gagawa siya ng object: NOT WORKING
        //from Edwin add function to prevent form from loading after form submission: https://www.youtube.com/watch?v=NxVCq4p0Kb0&t=319s
        //https://eloquentjavascript.net/2nd_edition/18_forms.html: WORKING

        //!!!!IMPORTANT DONT FORGET THIS IN EVERY PAGE!!!!
        //get bankAccountList from local storage if bank is not yet in LS, create new object
        function getOrCreateBankAccountList(){
            bankAccountList =  JSON.parse(localStorage.getItem("bankAccountList"))
                            ? JSON.parse(localStorage.getItem("bankAccountList"))
                            : [];
        }

        function getOrCreateTransactionList(){
            transactionList = JSON.parse(localStorage.getItem("transactionList"))
                            ? JSON.parse(localStorage.getItem("transactionList"))
                            : [];
        }

        //GLOBAL VARIABLES
        let bankAccountList;
        var createAccountForm   = document.querySelector("form")
                                ? document.querySelector("form")
                                : " ";
        var startWithNumModal        = document.getElementById("modal-container1");
        var negativeNumModal        = document.getElementById("modal-container2");   
        var existsModal              = document.getElementById("modal-container3");
        var successModal             = document.getElementById("modal-container4");
        var okBtn1               = document.getElementById("okBtn1");
        var okBtn2               = document.getElementById("okBtn2");
        var okBtn3               = document.getElementById("okBtn3");
        var okBtn4               = document.getElementById("okBtn4");
        
        //EVENTLISTENER/HANDLER
        //prevent form from submitting and from creating empty object
        //on submit (the event itself, prevent submission and creation of empty accountowner object)
        createAccountForm.addEventListener("submit", function(event) {
            event.preventDefault();
        });

        okBtn1.addEventListener("click", function(){
            //replace this with homepage upon creation of homepage
            location.replace("resultsCopy.html");
            hideModals();
        });

        okBtn2.addEventListener("click", function(){
            //replace this with homepage upon creation of homepage
            location.replace("resultsCopy.html");
            hideModals();
        });

        okBtn3.addEventListener("click", function(){
            //replace this with homepage upon creation of homepage
            location.replace("resultsCopy.html");
            hideModals();
        });

        okBtn4.addEventListener("click", function(){
            //replace this with homepage upon creation of homepage
            location.replace("records.html");
            hideModals();
        });
        
        //4. ADD FUNCTION TO CREATE USER
        function create_user(user, balance){

            getOrCreateBankAccountList();
            getOrCreateTransactionList();
            let date           = new Date(); 
             
            let accountName    = document.getElementById("accountName").value; 
            
            let initialDeposit = document.getElementById("initialDeposit").value
                               ? document.getElementById("initialDeposit").value
                               : 0;
            
            //find if the input name already exists in local storage; if there is no existing name in LS return as empty to prevent error
            let checkName      = bankAccountList.find(account => account.accountName === accountName)
                               ? bankAccountList.find(account => account.accountName === accountName)
                               : " ";

            //check if name starts with num
            if(accountName.match(/^\d/)){
                alert(`${accountName} starts with a number! Please enter valid name that starts with a letter.`)
                startWithNumModal.style.display = "block";
            }else if( initialDeposit < 0){
                alert(`Initial deposit amount cannot be negative! Please enter a number equal to or greater than 0.`)
                negativeNumModal.style.display = "block";
            } else if(checkName.accountName === accountName){
                alert(`Account already exists!`) 
                existsModal.style.display = "block";
                
            } else{

                //1. create new account instance
                const account = {
                    accountNumber       :  Date.now(),
                    accountName         :  accountName,
                    accountBalance      :  initialDeposit,
                }
                
                //1.a. add the new account to bankAccountList array
                bankAccountList.push(account);

                //1.b confirm deposit successful via message prompt
                alert(`Account created for ${accountName} with initial balance of ${initialDeposit}.`);
                successModal.style.display = "block";

                //1.c save changes to bank object to the local Storage
                localStorage.setItem("bankAccountList", JSON.stringify(bankAccountList));

                 //2. create transaction List array to push details into during withdraw send deposit
                 const transaction = {
                        accountNumber   :  Date.now(),
                        accountName     :  accountName,
                        Date            : `${date}`,
                        Type            : `Open`,
                        Description     : `Account open with initial deposit of Php ${initialDeposit}.`,
                        Amount          : initialDeposit,
                    }

                transactionList.push(transaction);
                localStorage.setItem("transactionList", JSON.stringify(transactionList));
            }

            clearForm();
        }

        //TEST CASES:
        //1. name is not duplicate and amount not negative
        //Lestat Lioncourt 1000000
        //2. name is a duplicate
        //Lestat Lioncourt 1000000
        //3. name starts with a number
        //5estat Lioncourt 
        //name is not duplicate and amount is ""
        //Lydia Pandora
        //amount is negative
        //Marius Staten -50000

        function clearForm(){
            //erases inputs after submission
            createAccountForm.reset();
        }
        //ensures the page is loaded before functions are executed.
        window.onload =function(){ 
            //hideModals();
            document.getElementById("createAccountForm").onsubmit = create_user;

            //UNCOMMENT WHEN TESTING COMPLETE
            // document.getElementById("clearButton").onclick = clearStorage;
            // document.getElementById("retrieveButton").onclick = retrieveRecords;
        }

        function hideModals(){
            //QUESTION HOW TO TRIGGER MODAL IN MY SET UP?
            successModal.style.display = "none";
            startWithNumModal.style.display = "none";
            negativeNumModal.style.display = "none";
            existsModal.style.display = "none";
        }

        //retrieveRecords is FOR TEST PURPOSES ONLY retrieves items in the localStorage and displays 
        // function retrieveRecords(){ 
        //     console.log("retrieve records");
            
        //     var records = localStorage.getItem("bankAccountList");
        //     var paragraph = document.createElement("p");
        //     var details = document.createTextNode(records);
        //     paragraph.appendChild(details);
        //     var element = document.getElementById("retrieve");
        //     element.appendChild(paragraph);
        // }

        //retrieveRecords is FOR TEST PURPOSES ONLY //clears the entire localStorage
        // function clearStorage(){ 
        //     localStorage.clear();
        //     console.log("clear records");
        // }
