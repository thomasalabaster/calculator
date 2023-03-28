
// Init variables and consts
const calcInput = document.getElementById("calc-input");
const calcOutput = document.getElementById("calc-sum");
const calcCharcoal = document.getElementsByClassName("calc-charcoal");
const calcGrey = document.getElementsByClassName("calc-grey");
const calcOrange = document.getElementsByClassName("calc-orange");

let operatorCheck = 0, tempNum1 = 0, tempNum2 = 0;
let currentOperator = "", lastChar = "";
let tempCurrentNumber = [];
// calcDone clears screen instead if user types number after original sum
let calcDone = false;
const maxDigits = 12;

// Functions
function operate() {
    let total = 0;
    // Check which operator is used
    if (currentOperator == "+") {
        total = tempNum1 + tempNum2;
    }
    else if (currentOperator == "-") {
        total = tempNum1 - tempNum2;
    }
    else if (currentOperator == "/") {
        total = tempNum1 / tempNum2;
    }
    else {
        total = tempNum1 * tempNum2;
    }
    // convert to scientific if too big
    let outputValue = parseFloat(total);
    if (outputValue.toString().length > maxDigits) {
        outputValue = outputValue.toExponential(2)
    }
    calcOutput.textContent = outputValue.toLocaleString("en-UK");

    clearMemory();
    // Resets tempNum1 to current sum, to continue operations
    tempNum1 = total;
    calcDone = true;
    return;
}
function operatorEvent(symbol) {
    calcDone = false;
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
    if (tempCurrentNumber.length == 0 || tempNum1 == 0) {
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
        case "c":
            clearCalc();
            return;
        case "Enter":
            sumEvent();
            return;
    };
}
function clearCalc() {
    clearMemory();
    calcOutput.textContent = "";
    calcInput.textContent = ""; 
    calcDone = false;
    return;
}
function periodEvent() {
    if (lastChar == "." || tempCurrentNumber.includes(".")){
        return;
    }
    calcInput.textContent += "."
    tempCurrentNumber.push(".");
}
function numberInput(number) {
    for (let i = 0; i <= 9; i++)
    {
        if (number == i)
        {
            if (calcDone)
            {
                clearCalc();
            }
            calcInput.textContent += i;
            tempCurrentNumber.push(i);
        }
    }
}
function changeButtonColour(button) {
    // Add and remove colours from buttons upon selection.
    button.classList.add("clicked");
    setTimeout(function() {
        button.classList.remove("clicked");
    }, 200);
    return;
}
function keydownColourChange(key) {
    // Colour change animation upon keyPress, some error checking also
    if (key == "Enter") {
        key = "=";
    }
    else if (key == "Shift") {
        return;
    }
    else if (key == 'Backspace')
    {
        return;
    }
    let selectedButton = document.querySelector(`button[value="${key}"]`);
    try {
        changeButtonColour(selectedButton);
    }
    catch(err) {}
    return;
}
// Keyboard events
document.addEventListener('keydown', (event) => {
    lastChar = calcInput.textContent.slice(-1);
    // Obtain the actual key value (e.g. 1 or 2...)
    let key = event.key;
    keydownColourChange(key);
    if (key == 'Backspace') {
        if (lastChar == " ") {
            deleteOperator(key);
            return;
        }
        calcInput.textContent = calcInput.textContent.slice(0, -1); 
        tempCurrentNumber.pop();
    }
    else if (key == '.') {
        periodEvent();
        return;
    }
    else if (key >= 0 && key <= 9) {
        numberInput(key);
        return;
    }
    callOperators(key);
})
// Click events
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', event => {
        changeButtonColour(button);
        lastChar = calcInput.textContent.slice(-1);
        // Get the value of the button and proceed accordingly
        const btnNum = button.getAttribute("value")
        if (btnNum == ".") {
            periodEvent();
            return;
        }
        if (btnNum >= 0 && btnNum <= 9)
        {   
            numberInput(btnNum);
            return;
        }
        callOperators(btnNum);
})});