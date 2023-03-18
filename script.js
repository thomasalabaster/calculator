
function add (a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate (operator, a, b) {
    if(operator.toLowerCase() == "add") {
        return add(a, b)
    }
    else if (operator.toLowerCase() == "subtract") {
        return subtract(a, b);
    }
    else if (operator.toLowerCase() == "multiply") {
        return multiply(a, b);
    }
    return divide(a, b)
}

