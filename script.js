const calcInput = document.getElementById("calc-input");
const calcOutput = document.getElementById("calc-sum");

const buttonClear = document.getElementById("but-AC");
const buttonZero = document.getElementById("but-0");
const buttonOne = document.getElementById("but-1");
const buttonTwo = document.getElementById("but-2");
const buttonThree = document.getElementById("but-3");
const buttonFour = document.getElementById("but-4");
const buttonFive = document.getElementById("but-5");
const buttonSix = document.getElementById("but-6");
const buttonSeven = document.getElementById("but-7");
const buttonEight = document.getElementById("but-8");
const buttonNine = document.getElementById("but-9");
const buttonPoint = document.getElementById("but-point");

const buttonDivide = document.getElementById("but-divide");
const buttonAdd = document.getElementById("but-add");
const buttonMinus = document.getElementById("but-minus");
const buttonMultiply = document.getElementById("but-multiply");
const buttonEquals = document.getElementById("but-equals");

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
    alert(`Temp1 = ${tempNum1} Temp 2 = ${tempNum2}`)
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
    return;
}

// Init variables
let operatorCheck = 0;
let currentOperator = "";
let tempNum1 = 0;
let tempNum2 = 0;
let tempCurrentNumber = [];

// Checked 
let lastChar = calcInput.textContent.slice(-1);

// Calculator Event Listeners
document.addEventListener('keydown', (event) => { 
    // Removing last key
    if (event.key == 'Backspace') {
        if (lastChar == " ") {
            alert(tempCurrentNumber.length);
            calcInput.textContent = calcInput.textContent.slice(0, -3);
            currentOperator = "";
            operatorCheck = 0;
            for (let i = 0; i < 3; i++) {
                tempCurrentNumber.pop();
            }
            alert(tempCurrentNumber.length);
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
    if (event.key == "/") {
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

// Operator functions
function additionEvent() {
    if (tempCurrentNumber.length == 0) {
            return;
    }
    currentOperator = "+";
    if (operatorCheck == 1 && lastChar == " ") {
        calcInput.textContent = calcInput.textContent.slice(0, -3);
    }
    if (tempNum1 == 0) {
        tempNum1 = Number(tempCurrentNumber.join(''));
        tempCurrentNumber = [];
        calcInput.textContent += " + ";
        return;
    }
    if (tempNum2 == 0) {
        tempNum2 = Number(tempCurrentNumber.join(''));
        tempCurrentNumber = [];
        operate();
        return
    }
    operatorCheck = 1;
    calcInput.textContent += " + ";
}
function subtractEvent() {
    if (tempCurrentNumber.length == 0) {
        return;
    }
    currentOperator = "-";
    if (operatorCheck == 1 && lastChar == " ") {
        calcInput.textContent = calcInput.textContent.slice(0, -3);
    }
    if (tempNum1 == 0) {
        tempNum1 = Number(tempCurrentNumber.join(''));
        tempCurrentNumber = [];
        calcInput.textContent += " - ";
        return;
    }
    if (tempNum2 == 0) {
        tempNum2 = Number(tempCurrentNumber.join(''));
        tempCurrentNumber = [];
        operate();
        return
    }
    operatorCheck = 1;
    calcInput.textContent += " - ";
}
function divideEvent() {
    if (tempCurrentNumber.length == 0) {
        return;
    }
    currentOperator = "/";
    if (operatorCheck == 1 && lastChar == " ") {
        calcInput.textContent = calcInput.textContent.slice(0, -3);
    }
    if (tempNum1 == 0) {
        tempNum1 = Number(tempCurrentNumber.join(''));
        tempCurrentNumber = [];
        calcInput.textContent += " ÷ ";
        return;
    }
    if (tempNum2 == 0) {
        tempNum2 = Number(tempCurrentNumber.join(''));
        tempCurrentNumber = [];
        operate();
        return
    }
    operatorCheck = 1;
    calcInput.textContent += " ÷ ";
}
function multiplyEvent() {
    if (tempCurrentNumber.length == 0) {
        return;
    }
    currentOperator = ("*");
    if (operatorCheck == 1 && lastChar == " ") {
        calcInput.textContent = calcInput.textContent.slice(0, -3);
    }
    if (tempNum1 == 0) {
        tempNum1 = Number(tempCurrentNumber.join(''));
        tempCurrentNumber = [];
        calcInput.textContent += " × ";
        return;
    }
    if (tempNum2 == 0) {
        tempNum2 = Number(tempCurrentNumber.join(''));
        tempCurrentNumber = [];
        operate();
        return
    }
    operatorCheck = 1;
    calcInput.textContent += " × ";
}
function sumEvent() {
    if (tempCurrentNumber.length == 0) {
        return;
    }   
    operatorCheck = 0;
    tempNum2 = Number(tempCurrentNumber.join(''));
    tempCurrentNumber = [];
    operate();
}
function zeroEvent() {
    if (tempCurrentNumber.length == 0)
    {
        calcInput.textContent += "0.";
        tempCurrentNumber.push("0.");
        return;
    }
    calcInput.textContent += buttonZero.textContent
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

// Clear Memory
function clearMemory() {
    tempCurrentNumber = [];
    tempNum1 = 0;
    tempNum2 = 0;
    currentOperator = 0;
}

// Event Listeners
buttonAdd.addEventListener("click", additionEvent);
buttonMinus.addEventListener("click", subtractEvent);
buttonDivide.addEventListener("click", divideEvent);
buttonMultiply.addEventListener("click", multiplyEvent);

buttonClear.addEventListener("mousedown", () => {
    clearMemory();
    calcOutput.textContent = "";
    calcInput.textContent = "";
});
buttonZero.addEventListener("click", zeroEvent);
buttonOne.addEventListener("click", () => {
    calcInput.textContent += 1;
    tempCurrentNumber.push(1);
});
buttonTwo.addEventListener("click", () => {
    calcInput.textContent += 2;
    tempCurrentNumber.push(2);
});
buttonThree.addEventListener("click", () => {
    calcInput.textContent += 3;
    tempCurrentNumber.push(3);
});
buttonFour.addEventListener("click", () => {
    calcInput.textContent += 4;
    tempCurrentNumber.push(4);
});
buttonFive.addEventListener("click", () => {
    calcInput.textContent += 5;
    tempCurrentNumber.push(5);
});
buttonSix.addEventListener("click", () => {
    calcInput.textContent += 6;
    tempCurrentNumber.push(6);
});
buttonSeven.addEventListener("click", () => {
    calcInput.textContent += 7;
    tempCurrentNumber.push(7);
});
buttonEight.addEventListener("click", () => {
    calcInput.textContent += 8;
    tempCurrentNumber.push(8);
});
buttonNine.addEventListener("click", () => {
    calcInput.textContent += 9;
    tempCurrentNumber.push(9);
});
buttonPoint.addEventListener("click", () => {
    pointEvent();
})
buttonEquals.addEventListener("click", () => {
    sumEvent();
});