import { characters, numbers, symbols } from "./data.js";

const generateButton = document.getElementById("generate-button");
const passwordOneEl = document.getElementById("password-one");
const passwordTwoEl = document.getElementById("password-two");
const passwordLengthEl = document.querySelectorAll('input[name="length"]');
const passwordOptionsEl = document.querySelectorAll('input[name="option"]');
const copyEl = document.getElementById("copy");

let pwLength = 15;

function setPasswordLength() {
    passwordLengthEl.forEach((node) => {
        if (node.checked) {
            pwLength = node.value;
        }
    });
}

function setPasswordOptions() {
    const options = [...characters];
    passwordOptionsEl.forEach((node) => {
        if (node.checked && node.value === "numbers") {
            options.push(...numbers);
        }

        if (node.checked && node.value === "symbols") {
            options.push(...symbols);
        }
    });
    return options;
}

function generateRandomPassword() {
    setPasswordLength();
    let pwOptions = setPasswordOptions();
    let randomPassword = "";
    for (let i = 0; i <= pwLength; i++) {
        let randomCharacter = Math.floor(Math.random() * pwOptions.length);
        randomPassword += pwOptions[randomCharacter];
    }
    return randomPassword;
}

function displayRandomPassword(e) {
    e.preventDefault();
    const passwordOne = generateRandomPassword();
    const passwordTwo = generateRandomPassword();
    passwordOneEl.textContent = passwordOne;
    passwordOneEl.value = passwordOne;
    passwordOneEl.classList.add("pointer");
    passwordTwoEl.textContent = passwordTwo;
    passwordTwoEl.value = passwordTwo;
    passwordTwoEl.classList.add("pointer");
}

function copyPassword(event) {
    const value = event.currentTarget.value;
    if (value) {
        copyEl.style.opacity = "1";
        navigator.clipboard.writeText(value);

        setTimeout(() => {
            copyEl.style.opacity = "0";
        }, 1000);
    }
}

generateButton.addEventListener("click", displayRandomPassword);
passwordOneEl.addEventListener("click", copyPassword);
passwordTwoEl.addEventListener("click", copyPassword);
