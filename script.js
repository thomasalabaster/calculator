// Init variables and consts
const calcInput = document.getElementById("calc-input");
const calcOutput = document.getElementById("calc-sum");

let operatorCheck = 0, tempNum1 = 0, tempNum2 = 0;
let currentOperator = "", lastChar = "";
let tempCurrentNumber = [];

// Functions
function add(a, b) {
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
function operate() {
    let total = 0;
    // Check which operator is used
    if (currentOperator == "+") {
        total = add(tempNum1, tempNum2)
    }
    else if (currentOperator == "/") {
        total = divide(tempNum1, tempNum2)
    }
    else if (currentOperator == "-") {
        total = subtract(tempNum1, tempNum2)
    }
    else {
        total = multiply(tempNum1, tempNum2)
    }
    calcOutput.textContent = total.toLocaleString("en-UK");
    clearMemory();
    // Resets tempNum1 to current sum, to continue operations
    tempNum1 = total;
    return;
}
function operatorEvent(symbol) {
    if (tempCurrentNumber.length == 0) {
        return;
    }
    // Stops some operator being displayed twice
    if (operatorCheck == 1 && lastChar == " ") {
        calcInput.textContent = calcInput.textContent.slice(0, -3);
    }
    if (tempNum1 == 0) {
        checkTempNum1(symbol);
        return;
    }
    if (tempNum2 == 0) {
        checkTempNum2(symbol);
        return
    }
    operatorCheck = 1;
    calcInput.textContent += " " + symbol + " ";
}
function checkTempNum1(symbol) {
    tempNum1 = Number(tempCurrentNumber.join(''));
    tempCurrentNumber = [];
    operatorCheck = 1;
    currentOperator = symbol;
    calcInput.textContent += " " + symbol + " ";
    return;
}
function checkTempNum2(symbol) {
    tempNum2 = Number(tempCurrentNumber.join(''));
    tempCurrentNumber = [];
    operate();
    currentOperator = symbol;
    calcInput.textContent += " " + symbol + " ";
}
function sumEvent() {
    if (tempCurrentNumber.length == 0) {
        return;
    }   
    tempNum2 = Number(tempCurrentNumber.join(''));
    operate();
    // Reset for continuation of calculation
    tempNum1.toString().split("").forEach(temp => {
        tempCurrentNumber.push(temp);
    });
    tempNum1 = 0;
}
function zeroEvent() {
    if (tempCurrentNumber.length == 0)
    {
        calcInput.textContent += "0.";
        tempCurrentNumber.push("0.");
        return;
    }
    calcInput.textContent += "0";
}
function pointEvent() {
    if (tempCurrentNumber.length == 0 || lastChar == ".")
    {
        calcInput.textContent += "0.";
        tempCurrentNumber.push("0.");
        return;
    }
    tempCurrentNumber.push(".");
    calcInput.textContent += ".";
}
function clearMemory() {
    tempCurrentNumber = [];
    tempNum1 = 0;
    tempNum2 = 0;
    operatorCheck = 0;
}
function deleteOperator(key) {
    calcInput.textContent = calcInput.textContent.slice(0, -3);
        currentOperator = "";
        operatorCheck = 0;
        for (let i = 0; i < 3; i++) {
            tempCurrentNumber.pop();
        }
        // Resets variables to pre-operator status
        tempNum1.toString().split("").forEach(temp => {
            tempCurrentNumber.push(temp);
        });
        tempNum1 = 0;    
}
function callOperators(operator) {
    switch (operator) {
        case "+":
            operatorEvent(operator);
            return;
        case "-":
            operatorEvent(operator);
            return;
        case "/":
            operatorEvent(operator);
            return;
        case "*":
            operatorEvent(operator);
            return;
        case "=":
            sumEvent();
            return;
        case "0":
            zeroEvent();
            return;
        case ".":
            pointEvent();
            return;
        case "c":
            clearMemory();
            calcOutput.textContent = "";
            calcInput.textContent = ""; 
            return;
        case "Enter":
            sumEvent();
            return;
    };
}
// Keyboard events
document.addEventListener('keydown', (event) => { 
    lastChar = calcInput.textContent.slice(-1);
    // Removing last key
    let key = event.key;
    if (key == 'Backspace') {
        if (lastChar == " ") {
            deleteOperator(key);
            return;
        }
        calcInput.textContent = calcInput.textContent.slice(0, -1); 
        tempCurrentNumber.pop();
    }
    // Numbers loop
    for (let i = 0; i <= 9; i++)
    {
        if (key == i)
        {
            // Don't allow multiple 0's to be added prior to anything
            if (tempCurrentNumber.length == 0 && key == 0) {
                return;
            }
            calcInput.textContent += i;
            tempCurrentNumber.push(i);
        }
    }
    callOperators(key);
})
// Click events
document.querySelectorAll('.calc-buttons').forEach(button => {
    button.addEventListener('click', event => {
        const btnNum = button.getAttribute("value")
        // Stops miss-entrie3s into calc display
        if (!(button.getAttribute("value"))) {
            return;
        }
        if (btnNum >= 1 && btnNum <= 9)
        {
            calcInput.textContent += btnNum;
            tempCurrentNumber.push(btnNum);
            return;
        }
        callOperators(btnNum);
        // Stops clear being called multiple times
        if (btnNum == "clear") {
            event.stopPropagation();
        }
    })
});

