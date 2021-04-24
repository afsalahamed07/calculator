function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function devide(a, b) {
    return a / b;
}

// object for calling curresponding fucntion
const calObject = {
    "+": add,
    "-": subtract,
    "x": multiply,
    "÷": devide
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
    btn.addEventListener("click", () => {
        clickFun(btn);
    });
});


window.addEventListener("keydown", keyPress);

function keyPress(e) {
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    clickFun(key);
}



// function to clear screen
function clearScreen() {
    calScreenTop.textContent = "";
    calScreenDown.textContent = "0";
    document.querySelector("#dot").style.pointerEvents = 'auto';
}

// function to diplay on top
function displayTop(key) {
    calScreenTop.textContent = calScreenDown.textContent + " " + key;
    calScreenDown.textContent = "";
}

// fucntion for delete
function displayDelete() {
    calScreenDown.textContent = calScreenDown.textContent.slice(0, -1);
}


function clickFun(btn) {
    let key = btn.textContent.trim();
    // when clinking an operator
    if (operator.indexOf(key) != -1) {
        displayTop(key);
        inserts.push(+calScreenTop.textContent.slice(0, calScreenTop.textContent.indexOf(key)));
        inserts.push(key);
        document.querySelector("#dot").style.pointerEvents = 'auto';

    } else if (key == "clear") {
        clearScreen()
        inserts = [];
    } else if (key == "delete") {
        displayDelete();
    } else if (key == "=") {
        if (inserts.length == 2) {
            inserts.push(+calScreenDown.textContent);

            let result = operate(...inserts);
            calScreenTop.textContent = inserts.slice(0, 3).join(" ");
            calScreenDown.textContent = result;

            inserts = [];
        }
    } else if (key == ".") {
        btn.style.pointerEvents = 'none';
        // check weather screen is 0
        if (calScreenDown.textContent == 0) {
            calScreenDown.textContent = 0 + key;
        } else {
            calScreenDown.textContent += key;
        }
    } else {
        // check weather screen is 0
        if (calScreenDown.textContent == 0 && !calScreenDown.textContent.includes(".")) {
            calScreenDown.textContent = key;
        } else {
            calScreenDown.textContent += key;
        }
    }

    if (inserts.length == 4) {
        let result = operate(...inserts);
        calScreenTop.textContent = inserts.slice(0, 3).join(" ");
        calScreenDown.textContent = result;

        inserts = [];
    }
}