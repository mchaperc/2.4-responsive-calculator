(function() {
	
	var arrayOfInstructions = [];
	var result = 0;
	var displayNumber = '';
	var storedValue = '';

	//Adding event listeners to each button

	[].forEach.call(document.querySelectorAll('.number'), function(element){
	  element.addEventListener('click', numberPressed);
	}, false);

	[].forEach.call(document.querySelectorAll('.operator'), function(element){
	  element.addEventListener('click', operatorPressed);
	}, false);

	[].forEach.call(document.querySelectorAll('.plus-minus'), function(element){
	  element.addEventListener('click', plusMinus);
	}, false);

	[].forEach.call(document.querySelectorAll('.scientific'), function(element){
	  element.addEventListener('click', scientificFunc);
	}, false);

	[].forEach.call(document.querySelectorAll('.memory'), function(element){
	  element.addEventListener('click', memoryFunc);
	}, false);

	//Function for adding the number that's been pressed to the array of instructions

	function numberPressed(event) {
		var button = event.target;
		var number = button.textContent;
		arrayOfInstructions.push(number);
		displayNumber+=number;
		changeContent(displayNumber);
	}

	//Function for adding the operator that's been pressed to the array of instructions
	//It will also check if the operator was the clear button or the equals button and respond accordingly

	function operatorPressed(event) {
		var button = event.target;
		var operator = button.textContent;
		displayNumber = '';
		if(operator === 'AC') {
			clearInstructions();
			changeContent(result);
			return;
		}
		if (arrayOfInstructions.length > 2) {
			if (operator === '=') {
				equals();
				clearInstructions();
				displayNumber = '';
				return;	
			} else {
				equals();
			}
		} else if ((arrayOfInstructions.length === 2 && operator === '=') && (clickCounter === 1 && nthExp === true)) {
			result = mapOfFunctions['x-n']();
			changeContent(result);
			displayNumber = '';
			clearInstructions();
			clickCounter = 0;
			nthExp = false;
			return;
		} else if ((arrayOfInstructions.length === 2 && operator === '=') && (clickCounter === 1 && nthRoot === true)) {
			result = mapOfFunctions['nth-root']();
			changeContent(result);
			displayNumber = '';
			clearInstructions();
			clickCounter = 0;
			nthRoot = false;
			return;
		}
		arrayOfInstructions.push(operator);
	}

	//Function for handling scientific button presses

	function scientificFunc(event) {
		var button = event.target;
		var science = button.getAttribute('data-key');
		result = mapOfFunctions[science]();
		if (science != 'pi' && science != 'e') {
			displayNumber = result;
		}
		changeContent(result);
		displayNumber = '';
	}

	function memoryFunc(event) {
		var button = event.target;
		var memory = button.getAttribute('data-key');
		console.log(memory);
		mapOfFunctions[memory]();
	}

	//Function for handling the calculation of current entries in the array of instructions

	function equals() {
		result = eval(arrayOfInstructions.join(''));
		arrayOfInstructions = [result];
		changeContent(result);
	}

	//Function for handling the plus-minus button

	function plusMinus() {
		var x = displayNumber;
		if (x >= 0) {
			x = '-' + x;
			displayNumber = x;
			changeContent(displayNumber);
			arrayOfInstructions[arrayOfInstructions.length-1] = x;
		} else if (x < 0) {
			x.charAt(0) = '';
			arrayOfInstructions[arrayOfInstructions.length-1] = x;
		} else {
			false;
		}
	}

	//Function for emptying the array of instructions and setting the result to zero

	function clearInstructions() {
		arrayOfInstructions = [];
		result = 0;
	}

	//Function for updating the content displayed in the calculator

	function changeContent (result) {
    	var myelement = document.getElementById("result");
    	myelement.innerHTML = result;
    }

    //Object container for all scientific functions and variables to control x-n and nth-root

    var clickCounter = 0;
    var nthExp = false;
    var nthRoot = false;

    var mapOfFunctions = {
		'x2': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
			return x*x;
		},
		'x3': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
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
				return Math.pow(x, n);
			}
		},
		'sq-root': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
			return Math.sqrt(x);
		},
		'cubed-root': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
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
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
			return Math.log10(x);
		},
		'sin': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
			return Math.sin(x);
		},
		'cos': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
			return Math.cos(x);
		},
		'tan': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
			return Math.tan(x);
		},
		'sinh': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
			return Math.sinh(x);
		},
		'cosh': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
			return Math.cosh(x);
		},
		'tanh': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
			return Math.tanh(x);
		},
		'pi': function() {
			var pi = Math.PI.toFixed(7).toString();
			arrayOfInstructions.push(pi);
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
			arrayOfInstructions.push(storedValue);
			changeContent(storedValue);
		},
		'M+': function() {
			storedValue = eval(storedValue + '+' + displayNumber).toString();
		},
		'M-': function () {
			storedValue = eval(storedValue + '-' + displayNumber).toString();
		}
	}

})();