const calcInput = document.getElementById("calc-input");
const calcOutput = document.getElementById("calc-sum");

const buttonClear = document.getElementById("but-AC");
const buttonZero = document.getElementById("but-0");



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
    calcOutput.textContent = total;
    clearMemory();
    return;
}

// Init variables
let operatorCheck = 0;
let currentOperator = "";
let tempNum1 = 0;
let tempNum2 = 0;
let tempCurrentNumber = [];

// Keyboard event listeners
document.addEventListener('keydown', (event) => { 
    // Last char for input correction
    let lastChar = calcInput.textContent.slice(-1);

    // Removing last key
    if (event.key == 'Backspace') {
        calcInput.textContent = calcInput.textContent.slice(0, -1); 
        tempCurrentNumber.pop();
    }

    // Numbers loop
    for (let i = 0; i < 9; i++)
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
        if (tempCurrentNumber.length == 0)
        {
            calcInput.textContent += "0.";
            tempCurrentNumber.push("0.");
            return;
        }
        calcInput.textContent += ".";
    }

    // Operators
    if (event.key == "/") {
        currentOperator = event.key;
        operatorCheck = 1;
        
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
        calcInput.textContent += " ÷ ";

    }
    else if (event.key == "*") {
        operatorCheck = 1;
        currentOperator = event.key;
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
        calcInput.textContent += " × ";
    }
    else if (event.key == "-") {
        operatorCheck = 1;
        currentOperator = event.key;
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
        calcInput.textContent += " - ";
    }
    else if (event.key == "+") {
        operatorCheck = 1;
        currentOperator = event.key;
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
        calcInput.textContent += " + ";
    }
    else if (event.key == "=" || event.key == "Enter") {
        operatorCheck = 0;
        tempNum2 = Number(tempCurrentNumber.join(''));
        tempCurrentNumber = [];
        operate();
    }
    
})
// 0 button
buttonZero.addEventListener("click", function() {
    if (tempCurrentNumber.length == 0)
    {
        calcInput.textContent += "0.";
        tempCurrentNumber.push("0.");
        return;
    }
    calcInput.textContent += buttonZero.textContent}
)
// AC Button
buttonClear.addEventListener("mousedown", () => {
    clearMemory();
    calcOutput.textContent = "";
    calcInput.textContent = "";
});

function clearMemory() {
    tempCurrentNumber = [];
    tempNum1 = 0;
    tempNum2 = 0;
    currentOperator = 0;
}