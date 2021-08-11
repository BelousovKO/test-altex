const buttonLength = document.querySelector('.button-length');
const inputLength = document.querySelector('.input-length');
const resultLengthString = document.querySelector('.result-length-string');
const resultString = document.querySelector('.result-string');
const symbolForLettersContainer = document.querySelector('.symbol-for-letters-container');
const inputSymbolForLetters = document.querySelector('.input-symbol-for-letters');
const buttonSymbolForLetters = document.querySelector('.button-symbol-for-letters');
const symbolForNumbersContainer = document.querySelector('.symbol-for-numbers-container');
const inputSymbolForNumbers = document.querySelector('.input-symbol-for-numbers');
const buttonSymbolForNumbers = document.querySelector('.button-symbol-for-numbers');
const infoCountFirstSymbol = document.querySelector('.count-first-symbol');
const infoCountSecondSymbol = document.querySelector('.count-second-symbol');
const infoCountOriginalSymbol = document.querySelector('.count-original-symbol');
let lengthString = 0;
let arrString;
const forbiddenSymbols = ['C', 'P', 'S', 'X'];
let availableSymbols = '+-_$~';
let symbolForLetters;
let symbolForNumbers;
let countFirstSymbol;
let countSecondSymbol;

for (let i = 48; i <= 57; i++) {
  availableSymbols += String.fromCharCode(i);
}
for (let i = 65; i <= 90; i++) {
  availableSymbols += String.fromCharCode(i);
}
for (let i = 97; i <= 122; i++) {
  if (!forbiddenSymbols.includes(String.fromCharCode(i))) {
    availableSymbols += String.fromCharCode(i);
  }
}

availableSymbols = availableSymbols.split('').filter(elem => !forbiddenSymbols.includes(elem))

inputLength.addEventListener('input', () => {
  resultLengthString.textContent = '';
  resultString.textContent = '';
  infoCountFirstSymbol.textContent = '';
  infoCountSecondSymbol.textContent = '';
  infoCountOriginalSymbol.textContent = '';
  symbolForLettersContainer.style.display = 'none';
  symbolForNumbersContainer.style.display = 'none';
  inputLength.value.length ? buttonLength.disabled = false : buttonLength.disabled = true;
});

buttonLength.addEventListener('click', () => {
  symbolForLettersContainer.style.display = 'block';
  lengthString = Math.abs(+inputLength.value);
  inputLength.value = '';
  buttonLength.disabled = true;
  resultLengthString.textContent = `Длина стороки: ${lengthString} символа(ов).`;
  arrString = new Array(lengthString).fill(0);
  arrString = arrString.map(() => availableSymbols[Math.floor(Math.random() * availableSymbols.length)]);
  resultString.textContent = `Результирующая строка: ${arrString.join('')}`;
});

inputSymbolForLetters.addEventListener('input', () => {
  inputSymbolForLetters.value.length === 1 ?
    buttonSymbolForLetters.disabled = false :
    buttonSymbolForLetters.disabled = true;
});

buttonSymbolForLetters.addEventListener('click', () => {
  symbolForNumbersContainer.style.display = 'block';
  symbolForLetters = inputSymbolForLetters.value;
  arrString = arrString.map(elem => {
    if (elem.charCodeAt(0) > 64 && elem.charCodeAt(0) < 91 || elem.charCodeAt(0) > 96 && elem.charCodeAt(0) < 123) {
      return symbolForLetters;
    }
    return elem;
  });
  resultString.textContent = `Результирующая строка: ${arrString.join('')}`;
  inputSymbolForLetters.value = '';
  buttonSymbolForLetters.disabled = true;
});

inputSymbolForNumbers.addEventListener('input', () => {
  inputSymbolForNumbers.value.length === 1 ?
    buttonSymbolForNumbers.disabled = false :
    buttonSymbolForNumbers.disabled = true;
});

buttonSymbolForNumbers.addEventListener('click', () => {
  symbolForNumbers = inputSymbolForNumbers.value
  arrString = arrString.map(elem => {
    if (elem.charCodeAt(0) > 47 && elem.charCodeAt(0) < 58) {
      return symbolForNumbers;
    }
    return elem;
  });
  resultString.textContent = `Результирующая строка: ${arrString.join('')}`;
  inputSymbolForNumbers.value = '';
  buttonSymbolForNumbers.disabled = true;
  const coincidences = arrString.reduce((acc, elem) => {
    acc[elem] ? acc[elem] += 1 : acc[elem] = 1;
    return acc
  }, {});
  countFirstSymbol = coincidences[symbolForLetters] || 0;
  countSecondSymbol = coincidences[symbolForNumbers] || 0;
  infoCountFirstSymbol.textContent = `Количество первого символа в строке - ${countFirstSymbol}`;
  infoCountSecondSymbol.textContent = `Количество второго символа в строке - ${countSecondSymbol}`;
  infoCountOriginalSymbol.textContent =
    `Количество не заменённых символов - ${arrString.length - countFirstSymbol - countSecondSymbol}`
});


