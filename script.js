function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

// object for calling curresponding fucntion
const calObject = {
    "+": add,
    "-": subtract,
    "*": multiply
}

// 
function operate(a, operator, b) {
    let result = calObject[operator](a, b);
    return result;
}

let calScreenTop = document.querySelector("#display-top");
let calScreenDown = document.querySelector("#display-down");
let btns = document.querySelectorAll(".btn");

let inserts = [];

const operator = ["+", "-", "x", "÷"];



btns.forEach(btn => {
    btn.addEventListener("click", displayValue);
});


window.addEventListener("keydown", clickFucntion);

function clickFucntion(e) {
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
}

function displayValue() {
    let key = this.textContent.trim();

    if (inserts.length == 4) {
        inserts.push(+calScreenDown.textContent);
        let result = operate(...inserts);
        calScreenTop.textContent = inserts.join(" ");
        calScreenDown.textContent = result;

        inserts = [];
    }

    // checking weather the user pressed an operator
    else if (operator.indexOf(key) != -1) {
        calScreenTop.textContent = calScreenDown.textContent;
        calScreenDown.textContent = "";
        // store tha value in varivble
        inserts.push(+calScreenTop.textContent);
        inserts.push(key);

        // } else if (key == "=") {

        //     inserts.push(+calScreenDown.textContent);
        //     let result = operate(...inserts);
        //     calScreenTop.textContent = inserts.join(" ");
        //     calScreenDown.textContent = result;


    } else {
        // check weather screen is 0
        if (calScreenDown.textContent == 0) {
            calScreenDown.textContent = key;
        } else {
            calScreenDown.textContent += key;
        }
    }

    console.log(inserts);
}