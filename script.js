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
function operate(a, b, operator) {
    let result = calObject[operator](a, b);
    return result;
}