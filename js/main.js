// (function() {


	//Event handler assignments

	[].forEach.call(document.querySelectorAll('.number'), function(element) {
		element.addEventListener('click', numberPressed);
	}, false);
	[].forEach.call(document.querySelectorAll('.operator'), function(element) {
		element.addEventListener('click', operatorPressed);
	}, false);
	[].forEach.call(document.querySelectorAll('.scientific'), function(element) {
		element.addEventListener('click', scientificPressed);
	}, false);

	[].forEach.call(document.querySelectorAll('button'), function(element) {
		element.addEventListener('click', function(){
			console.log('calculation:', calculation);
			console.log('displayNumber:', displayNumber);
			console.log('pendingOperation:', pendingOperation);
			console.log('temporaryNumber:', temporaryNumber);
		});
	}, false);


	var calculation = 0;
	var displayNumber = '0';
	var pendingOperation = undefined;
	var $display = document.querySelector('.display-output');
	var temporaryNumber = '';
	var storedValue = '';

	function numberPressed(event) {
		var number = Number(event.target.innerHTML);
		if (pendingOperation === 'x-n') {

		} else if (pendingOperation === 'nth-root') {

		} else if (pendingOperation === '%') {
			temporaryNumber += number.toString();
			pendingOperation = undefined;
		} else {
			updateDisplayAndCalc(number);
		}
	}

	// Operations for '.' and '%' don't work as designed

	function operatorPressed(event) {
		var operator = event.target.getAttribute('data-key');

		if (operator === '=' && clickCounter === 1 && nthExp === true) {
			calculation = mapOfFunctions['x-n']();
			$display.textContent = calculation.toString();
			displayNumber = '';
			clearFunc();
			clickCounter = 0;
			nthExp = false;
			return;
		} else if (operator === '=' && clickCounter === 1 && nthRoot === true) {
			calculation = mapOfFunctions['nth-root']();
			$display.textContent = calculation.toString();
			displayNumber = '';
			clearFunc();
			clickCounter = 0;
			nthRoot = false;
			return;
		}

		if (operator === 'AC') {
			calculation = 0;
			displayNumber = '0';
			pendingOperation = undefined;
			temporaryNumber = '';
			$display.textContent = displayNumber;
		} else if (operator === '+/-') {
			if (displayNumber > 0) {
				displayNumber = '-' + displayNumber;
				$display.textContent = displayNumber;
			} else {
				displayNumber = Math.abs(Number(displayNumber));
				$display.textContent = displayNumber;
			}
		} else if (operator === '.') {
			displayNumber+= '.';
			$display.textContent = displayNumber;
			temporaryNumber = displayNumber;
		} else if (operator === '%') {
			displayNumber = (Number(displayNumber) / 100).toString();
			$display.textContent = displayNumber;
			temporaryNumber = Number(displayNumber);
			pendingOperation = operator;
			console.log(pendingOperation);
		} else {

			switch(pendingOperation) {
				case '%':
					pendingOperation = operator;
					calculation = Number(temporaryNumber)
					displayNumber = '';
					break;
				case undefined:
					pendingOperation = operator;
					displayNumber = '';
					break;
				case '+':
					calculation += Number(displayNumber);	
					$display.textContent = calculation.toString();
					pendingOperation = operator;
					displayNumber = '';
					break;
				case '-':
					calculation -= Number(displayNumber);
					$display.textContent = calculation.toString();
					pendingOperation = operator;
					displayNumber = '';
					break;
				case '*':
					calculation *= Number(displayNumber);
					$display.textContent = calculation.toString();
					pendingOperation = operator;
					displayNumber = '';
					break;
				case '/':
					calculation /= Number(displayNumber);
					$display.textContent = calculation.toString();
					pendingOperation = operator;
					displayNumber = '';
					break;
			}
		}
	}

	function scientificPressed(event) {
		var button = event.target;
		var science = button.getAttribute('data-key');
		calculation = mapOfFunctions[science]();
		if (science != 'pi' && science != 'e') {
			displayNumber = calculation.toString();
		}
		$display.textContent = calculation.toString();
		displayNumber = '';
	}

	function memoryFunc(event) {
		var button = event.target;
		var memory = button.getAttribute('data-key');
		console.log(memory);
		mapOfFunctions[memory]();
	}

	function updateDisplayAndCalc(number) {
		if(pendingOperation === undefined) {
			if (displayNumber === '0') {
				displayNumber = number.toString();
			} else {
				displayNumber += number.toString();
			}
			if (calculation === 0) {
				calculation = number;
			} else {
				if (temporaryNumber.length > 0) {
					calculation = Number(displayNumber);
				} else {
					calculation = Number(calculation.toString() + displayNumber);
				}
			}
		} else {
			if (displayNumber === '') {
				displayNumber = number.toString();
			} else {
				displayNumber += number.toString();
			}
		}
		$display.textContent = displayNumber;

	}


	var clickCounter = 0;
    var nthExp = false;
    var nthRoot = false;

    var mapOfFunctions = {
		'x2': function() {
			var x = Number(displayNumber);
			return x*x;
		},
		'x3': function() {
			var x = Number(displayNumber);
			return x*x*x;
		},
		'x-n': function() {
			if (clickCounter < 1 && nthExp === false) {
				clickCounter += 1;
				nthExp = true;
				if (displayNumber.length > 1) {
					for (var i = 0; i < displayNumber.length; i++) {
						arrayOfInstructions.pop();
					}
					arrayOfInstructions.push(displayNumber);
				}
				return arrayOfInstructions[0];
			} else {
				var x = arrayOfInstructions[0];
				var n = arrayOfInstructions[1];
				
				//Could use return Math.pow(x, n);
				for (var i = 0; i < n-1; i++) {
					result *= x;
				}
				return result;
			}
		},
		'sq-root': function() {
			var x = Number(displayNumber);
			return Math.sqrt(x);
		},
		'cubed-root': function() {
			var x = Number(displayNumber);
			return Math.pow(x, 1/3);
		},
		'nth-root': function() {
			if (clickCounter < 1 && nthRoot === false) {
				clickCounter += 1;
				nthRoot = true;
				if (displayNumber.length > 1) {
					for (var i = 0; i < displayNumber.length; i++) {
						arrayOfInstructions.pop();
					}
					arrayOfInstructions.push(displayNumber);
				}
				return arrayOfInstructions[0]; 
			} else {
				var x = arrayOfInstructions[0];
				var n = arrayOfInstructions[1];
  				var y = Math.pow(Math.abs(x), 1/n);
  				return x < 0 ? -y : y;
			}
		},
		'log': function() {
			var x = Number(displayNumber);
			return Math.log10(x);
		},
		'sin': function() {
			var x = Number(displayNumber);
			return Math.sin(x);
		},
		'cos': function() {
			var x = Number(displayNumber);
			return Math.cos(x);
		},
		'tan': function() {
			var x = Number(displayNumber);
			return Math.tan(x);
		},
		'sinh': function() {
			var x = Number(displayNumber);
			return Math.sinh(x);
		},
		'cosh': function() {
			var x = Number(displayNumber);
			return Math.cosh(x);
		},
		'tanh': function() {
			var x = Number(displayNumber);
			return Math.tanh(x);
		},
		'pi': function() {
			var pi = Math.PI.toFixed(7).toString();
			displayNumber = pi;
			calculation = Number(pi);
			$display.textContent = pi;
			return pi;
		},
		'e': function() {
			var e = Math.E.toFixed(7).toString();
			arrayOfInstructions.push(e);
			return e
		},
		'MS': function() {
			storedValue = displayNumber;
			console.log(storedValue);
			console.log(displayNumber);
			for (var i = 0; i < displayNumber.length; i++) {
				arrayOfInstructions.pop();
			}
			displayNumber = '';
			console.log(displayNumber);
			return;
		},
		'MC': function() {
			storedValue = '';
		},
		'MR': function() {
			displayNumber = storedValue;
			calculation = Number(storedValue);
			$display.textContent = storedValue;
		},
		'M+': function() {
			storedValue = eval(storedValue + '+' + displayNumber).toString();
		},
		'M-': function () {
			storedValue = eval(storedValue + '-' + displayNumber).toString();
		}
	}


// })();