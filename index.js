const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"]

const generateButton = document.getElementById("generate-button");
const passwordOneEl = document.getElementById("password-one");
const passwordTwoEl = document.getElementById("password-two");
const passwordLengthEl = document.querySelectorAll('input[name="length"]')
const passwordOptionsEl = document.querySelectorAll('input[name="option"]')

let pwLength = 15;

function setPasswordLength(){
    passwordLengthEl.forEach((node) => {
        if(node.checked){
            pwLength = node.value;
        }
    })
}

function setPasswordOptions(){
    const options = [...characters]
    passwordOptionsEl.forEach((node) => {
        if(node.checked && node.value === "numbers") {
            options.push(...numbers)
        }
        
        if(node.checked && node.value === "symbols") {
            options.push(...symbols)
        }
    })
    return options;
}

function generateRandomPassword(){
    setPasswordLength()
    let pwOptions = setPasswordOptions()
    let randomPassword = ""
    for (let i = 0; i <= pwLength; i++){
        let randomCharacter = Math.floor(Math.random() * pwOptions.length)
        randomPassword += pwOptions[randomCharacter];
    }
    return randomPassword;
}

function displayRandomPassword(e){
    e.preventDefault();
    const passwordOne = generateRandomPassword();
    const passwordTwo = generateRandomPassword();
    passwordOneEl.textContent = passwordOne;
    passwordOneEl.value = passwordOne;
    passwordTwoEl.textContent = passwordTwo;
    passwordTwoEl.value = passwordTwo;
}

function copyPassword(event){
    const value = event.currentTarget.value;
    if(value){
        navigator.clipboard.writeText(value);
    }
}

generateButton.addEventListener("click", displayRandomPassword)
passwordOneEl.addEventListener("click", copyPassword)
passwordTwoEl.addEventListener("click", copyPassword)

