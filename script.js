// Init variables and consts
const calcInput = document.getElementById("calc-input");
const calcOutput = document.getElementById("calc-sum");

const buttonZero = document.getElementById("but-0");
const buttonPoint = document.getElementById("but-point");

const buttonClear = document.getElementById("but-AC");
const buttonDivide = document.getElementById("but-divide");
const buttonAdd = document.getElementById("but-add");
const buttonMinus = document.getElementById("but-minus");
const buttonMultiply = document.getElementById("but-multiply");
const buttonEquals = document.getElementById("but-equals");

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
    console.log(`Current Operator = ${currentOperator}`);
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
// Operator functions
function additionEvent() {
    operatorEvent("+")
}
function subtractEvent() {
    operatorEvent("-");
}
function divideEvent() {
    operatorEvent("/");
}
function multiplyEvent() {
    operatorEvent("*");
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
    calcInput.textContent += " " + symbol + " ";
    currentOperator = symbol;
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
    console.log("sumEvent triggered")
    if (tempCurrentNumber.length == 0) {
        console.log("tempCurrentNumber.len triggered")
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
    calcInput.textContent += buttonZero.textContent;
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

// Event Listeners
document.addEventListener('keydown', (event) => { 
    lastChar = calcInput.textContent.slice(-1);
    // Removing last key
    if (event.key == 'Backspace') {
        if (lastChar == " ") {
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
            return;
        }
        calcInput.textContent = calcInput.textContent.slice(0, -1); 
        tempCurrentNumber.pop();
    }
    // Numbers loop
    for (let i = 0; i <= 9; i++)
    {
        if (event.key == i)
        {
            // Don't allow multiple 0's to be added prior to anything
            if (tempCurrentNumber.length == 0 && event.key == 0) {
                return;
            }
            calcInput.textContent += i;
            tempCurrentNumber.push(i);
        }
    }
    if (event.key == ".") {
        pointEvent();
    }
    // Operators
    else if (event.key == "/") {
        divideEvent();
    }
    else if (event.key == "*") {
        multiplyEvent();
    }
    else if (event.key == "-") {
        subtractEvent();
    }
    else if (event.key == "+") {
        additionEvent();
    }
    else if (event.key == "=" || event.key == "Enter") {
        sumEvent();
    }
})

document.querySelectorAll('.calc-buttons').forEach(button => {
    button.addEventListener('click', event => {
        alert("hi");
        // Stops miss-entrie3s into calc display
        if (!(button.getAttribute("value"))) {
            return;
        }
        const btnNum = button.getAttribute("value")
        calcInput.textContent += btnNum;
        tempCurrentNumber.push(btnNum);
    })
});

buttonAdd.addEventListener("click", additionEvent);
buttonMinus.addEventListener("click", subtractEvent);
buttonDivide.addEventListener("click", divideEvent);
buttonMultiply.addEventListener("click", multiplyEvent);
buttonZero.addEventListener("click", zeroEvent);
buttonClear.addEventListener("mousedown", () => {
    clearMemory();
    calcOutput.textContent = "";
    calcInput.textContent = "";
});
buttonPoint.addEventListener("click", () => {
    pointEvent();
})
buttonEquals.addEventListener("click", () => {
    sumEvent();
});