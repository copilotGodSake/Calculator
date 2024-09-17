import { formatOutputNumber } from '../utils/utils.js';
import './styles/light-theme.css';
import './styles/dark-theme.css';
import './styles/default-theme.css';

const output = document.querySelector('.output span');
const numbers = document.querySelectorAll('.numbers');
const operands = document.querySelectorAll('.operation-btn');
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal');
const percentage = document.querySelector('.percentage');
const signChange = document.querySelector('.sign-change');

let firstArg = '';
let secondArg = '';
let operand = '';
let isFirstArg = false;
let isSecondArg = false;
let outputValue = '';
output.innerHTML = 0;

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        let value = e.target.getAttribute('data-value');
        if (isFirstArg === false) {
            getFirstArg(value);
        }
        if (isSecondArg === false) {
            getSecondArg(value);
        }
        if (outputValue === 'Error') {
            handleInputError(value);
        }
    });

    function getFirstArg(val) {
        output.innerHTML = '';
        firstArg += val;
        output.innerHTML = firstArg;
        firstArg = +firstArg;

        formatOutputNumber(firstArg, output);
        adjustFontSize();
    }

    function getSecondArg(val) {
        if (firstArg != '' && operand != '') {
            secondArg += val;
            output.innerHTML = secondArg;
            secondArg = +secondArg;
        }
        formatOutputNumber(secondArg, output);
        adjustFontSize();
    }

    function getOperand() {
        for (let i = 0; i < operands.length; i++) {
            operands[i].addEventListener('click', (e) => {
                operand = e.target.getAttribute('data-value');
                isFirstArg = true;
            });
        }
    }

    function calculate() {
        // If secondArg is missing, use firstArg as secondArg
        if (secondArg === '') {
            secondArg = firstArg;
        }
        if (firstArg === 0) {
            firstArg = 0;
        }
        output.innerHTML = '';
        switch (operand) {
            case '+':
                outputValue = firstArg + secondArg;
                break;
            case '-':
                outputValue = firstArg - secondArg;
                break;
            case '×':
                outputValue = firstArg * secondArg;
                break;
            case '÷':
                if (secondArg === 0) {
                    outputValue = 'Error';
                    break;
                } else {
                    outputValue = firstArg / secondArg;
                    break;
                }

            default:
                outputValue = 0;
                isFirstArg = false;
                isSecondArg = false;
                operand = '';
        }

        // // Check if the output is an error
        if (outputValue === 'Error') {
            output.innerHTML = outputValue;
            firstArg = '';
            secondArg = '';
            operand = '';
            return;
        }

        // formating the output value with commas
        if (typeof outputValue === 'number' || !isNaN(outputValue)) {
            outputValue = parseFloat(outputValue); // Ensure outputValue is a number
            if (!isNaN(outputValue)) {
                // Check if outputValue is a valid number
                if (outputValue > 1e10 || outputValue < -1e10) {
                    outputValue = outputValue.toExponential(4);
                } else {
                    outputValue = outputValue.toFixed(10);
                    outputValue = parseFloat(outputValue);
                }
            } else {
                outputValue = 'Error';
            }
        } else {
            outputValue = 'Error';
        }

        output.innerHTML = outputValue;
        // Reset state for new input
        firstArg = outputValue;
        secondArg = '';
        operand = '';
        isFirstArg = true;
        formatOutputNumber(outputValue, output);
        adjustFontSize();
        outputLength();
    }

    function handleInputError(value) {
        if (output.innerHTML === 'Error') {
            output.innerHTML = '';
            firstArg = '';
            secondArg = '';
            operand = '';
        }
        output.innerHTML = value;
        if (operand === '') {
            firstArg = parseFloat(output.innerHTML);
        } else {
            secondArg = parseFloat(output.innerHTML);
        }
    }

    function adjustFontSize() {
        if (output.innerHTML.length > 12) {
            output.style.fontSize = '2rem';
        } else {
            output.style.fontSize = '3rem';
        }
    }

    function outputLength() {
        if (output.innerHTML.length > 14) {
            output.innerHTML = output.innerHTML.slice(0, 14);
        }
    }

    equal.addEventListener('click', calculate);
    getOperand();

    clear.addEventListener('click', () => {
        output.innerHTML = 0;
        firstArg = '';
        secondArg = '';
        isFirstArg = false;
        isSecondArg = false;
        operand = '';
        outputValue = 0;
    });

    percentage.addEventListener('click', () => {
        output.innerHTML = '';
        if (firstArg != '') {
            outputValue = firstArg / 100;
            firstArg = outputValue;
        }
        if (firstArg != '' && secondArg != '' && operand != '') {
            outputValue = outputValue / 100;
        }
        output.innerHTML = outputValue;
    });

    signChange.addEventListener('click', () => {
        output.innerHTML = '';
        if (firstArg != '') {
            outputValue = -firstArg;
            firstArg = outputValue;
        }
        if (firstArg != '' && secondArg != '' && operand != '') {
            outputValue = -outputValue;
        }
        output.innerHTML = outputValue;
        formatOutputNumber(outputValue, output);
    });

    function toggleTheme() {
        const body = document.body;
        const currentTheme = body.classList.contains('light-theme')
            ? 'light'
            : body.classList.contains('dark-theme')
              ? 'dark'
              : 'default';
        const newTheme =
            currentTheme === 'default'
                ? 'light'
                : currentTheme === 'light'
                  ? 'dark'
                  : 'default';

        body.classList.remove(`${currentTheme}-theme`);
        if (newTheme !== 'default') {
            body.classList.add(`${newTheme}-theme`);
        }
        localStorage.setItem('theme', newTheme);
    }

    document
        .getElementById('theme-toggle')
        .addEventListener('click', toggleTheme);

    // Apply the saved theme on page load
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme') || 'default';
        if (savedTheme !== 'default') {
            document.body.classList.add(`${savedTheme}-theme`);
        }
    });
}
