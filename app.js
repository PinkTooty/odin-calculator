const display = document.querySelector('.display')
const numButtons = document.querySelectorAll('.number')
const operandButtons = document.querySelectorAll('.operand')
const clear = document.querySelector('.clear')
const equals = document.querySelector('.equals')

let expression = null;
let isClicked = false;
let isSolved = false;
let x = [];
let y = [];
let result;

const operate = (operator, a, b) => operators[operator](a, b)

const toString = () => {
    x = x.join('')
    y = y.join('')
}

const resetAll = () => {
    expression = null;
    x = [];
    y = [];
    isClicked = false;
    display.textContent = '0';
}

const operators = {
    '+': (x, y) => {
        x = parseFloat(x)
        y = parseFloat(y)
        return x + y
    },
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => (y == 0) ? 'ERROR' : x / y,
}

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (isClicked !== true) {
            x.push(button.textContent)
            display.textContent = x.join('')
        }
        else {
            y.push(button.textContent)
            display.textContent = `${x.join('')} ${expression} ${y.join('')}`
            operandButtons.forEach((button) => {
                button.classList.remove('highlighted')
            })
        }
    })
})

operandButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (x.length === 0) {
            console.log('ERROR');
        }
        else if (expression === null) {
            button.classList.add('highlighted')
            isClicked = true;
            expression = button.textContent;
            display.textContent = `${x.join('')} ${expression}`
        }
        else if (x.length > 0 && y.length > 0) {
            button.classList.add('highlighted')
            toString()
            result = operate(expression, x, y)
            display.textContent = result
            expression = button.textContent;
            x = [result];
            y = [];
        }
    })
})

clear.addEventListener('click', resetAll)

equals.addEventListener('click', () => {
    if (y.length === 0) return
    toString()
    result = operate(expression, x, y)
    display.textContent = result
    expression = null;
    x = [];
    y = [];
    isClicked = false;
})