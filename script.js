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
let percentCheck = false;
const maxDigits = 12;
let total = 0;

// Functions
function operate() {
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
        // Allow negative numbers to be entered
        if (symbol == "-" || tempCurrentNumber[0] != "-") {
            calcInput.textContent += "-";
            tempCurrentNumber.push("-");
        }
        return;
    }
    // Stops multiple "-" being added
    if (tempCurrentNumber.length == 1 && tempCurrentNumber[0] == "-")
    {
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
    percentCheck = false; // Allows for sum of operation to be % modified
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
    percentCheck = false;
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
    // Error catching for type error, e.g. letter pressed
    try {
        changeButtonColour(selectedButton);
    }
    catch(err) {}
    return;
}
function backspaceEvent(key) {
    if (lastChar == " ") {
        deleteOperator(key);
        // Check if calc input cleared, if so,hard reset.
        if (calcInput.textContent.length == 0) {
            clearCalc();
            clearMemory();
        }
        return;
    }
    calcInput.textContent = calcInput.textContent.slice(0, -1); 
    tempCurrentNumber.pop();
    // Check if calc input cleared, if so, hard reset
    if (calcInput.textContent == 0) {
        clearCalc();
        clearMemory();
        return;
    }
}
function modifyCalcOutput(char) {
    // Modify the calcOutput for +/- or % buttons, if calc has been done
    if (calcOutput.textContent[0] == char) {
        calcOutput.textContent = calcOutput.textContent.substring(1);
        tempCurrentNumber.shift();
    }
    else {
        calcOutput.textContent = char + calcOutput.textContent; 
        tempCurrentNumber.unshift(char);
    }
}
function percentEvent() {
    // Convert number to a percent, reverse the operation
    if (lastChar == "."  || tempCurrentNumber.length == 0) {
        return;
    }
    if (!percentCheck) {
        percentEventOutput("/");
        return;
    }
    else if (percentCheck) {
        percentEventOutput("*");
        return;
    }
}
function percentEventOutput(operator) {
    // Modify the calcScreen if % button pressed
    let tempNumber;
    if (operator == "*") {
        tempNumber = parseFloat(tempCurrentNumber.join("")) * 100;
        percentCheck = false;
    }
    else if (operator == "/") {
        tempNumber = parseFloat(tempCurrentNumber.join("")) / 100;
        percentCheck = true;
    }
    if (calcDone) { // Modify value after a calculation
        calcOutput.textContent = calcOutput.textContent.slice(0, -(tempCurrentNumber.length));
        tempCurrentNumber = tempNumber.toString().split("");
        calcOutput.textContent += tempCurrentNumber.join("");
    }
    else { // Modify current value (pre-calculation)
        calcInput.textContent = calcInput.textContent.slice(0, -(tempCurrentNumber.length));
        tempCurrentNumber = tempNumber.toString().split("");
        calcInput.textContent += tempCurrentNumber.join("");
    }
    return;
}
function plusMinusEvent() {
    if (tempCurrentNumber.length == 0) {
        return;
    } 
    // Check if calc done already, if so modify calcOutput not calcInput
    if (calcDone) {
        modifyCalcOutput("-");
        return;
    }
    // Check if calc is mid calculation, and operator has been selected
    if (operatorCheck == 1 && !calcDone) 
    {
        let tempLen = tempCurrentNumber.length
        if (tempCurrentNumber[0] == "-") {
            tempCurrentNumber.shift();
            calcInput.textContent = calcInput.textContent.replace('-', '');
            return;
        }
        else {
            tempCurrentNumber.splice(0, 0, "-");
            calcInput.textContent = calcInput.textContent.slice(0, -tempLen ) + "-" + calcInput.textContent.slice(-tempLen);
        }
        return;
    }
    //
    if (tempCurrentNumber[0] !== '-') {
        // If the first character of tempCurrentNumber is not "-", add it to the beginning
        tempCurrentNumber.unshift('-');
        calcInput.textContent = "-" + calcInput.textContent;
        return;
    }
    // Reverse of previous operation
    if (tempCurrentNumber[0] == '-') {
        console.log("hi");
        tempCurrentNumber.shift();
        calcInput.textContent = calcInput.textContent.substring(1);
        return;
    }
    return;
}
// Keyboard events
document.addEventListener('keydown', (event) => {
    lastChar = calcInput.textContent.slice(-1);
    // Obtain the actual key value (e.g. 1 or 2...)
    let key = event.key;
    keydownColourChange(key);
    if (key == 'Backspace') {
        backspaceEvent(key);
    }
    else if (key == '.') {
        periodEvent();
        return;
    }
    else if (key == "%")
    {   
        percentEvent();
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
        if (btnNum == "plusMinus") {
            plusMinusEvent();
            return;
        }
        else if (btnNum == "percent") {
            percentEvent();
            return;
        }
        else if (btnNum == ".") {
            periodEvent();
            return;
        }
        else if (btnNum >= 0 && btnNum <= 9)
        {   
            numberInput(btnNum);
            return;
        }
        callOperators(btnNum);
})});