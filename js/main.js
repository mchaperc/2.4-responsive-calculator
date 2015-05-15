// (function() {
	
	var arrayOfInstructions = [];
	var result = 0;
	var displayNumber = '';

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
		}
		arrayOfInstructions.push(operator);
	}

	//Function for handling scientific button presses

	function scientificFunc(event) {
		var button = event.target;
		var science = button.getAttribute('data-key');
		result = mapOfFunctions[science]();
		arrayOfInstructions = [result];
		displayNumber = result;
		changeContent(result);
		displayNumber = '';
		console.log(science);
	}

	//Function for handling the calculation of current entries in the array of instructions

	function equals() {
		result = eval(arrayOfInstructions.join(''));
		arrayOfInstructions = [result];
		changeContent(result);
	}

	//Function for handling the plus-minus button

	function plusMinus() {
		var x = arrayOfInstructions[arrayOfInstructions.length-1]
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
		console.log(result);
    	var myelement = document.getElementById("result");
    	myelement.innerHTML = result;
    }

    //Object container for all scientific functions

    var mapOfFunctions = {
		'x2': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
			return x*x;
		},
		'x3': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
			return x*x*x;
		},
		// 'x-n': function() {
		// 	var x = arrayOfInstructions[arrayOfInstructions.length-1];
		// 	var n = 
		// },
		'sq-root': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
			return Math.sqrt(x);
		},
		'cubed-root': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
			return Math.pow(x, 1/3);
		},
		'nth-root': function() {
			var x = arrayOfInstructions[arrayOfInstructions.length-1];
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
			displayNumber = pi;
			arrayOfInstructions.push(pi);
			changeContent(pi);
		},
		'e': function() {
			var e = Math.E.toFixed(7).toString();
			displayNumber = e;
			arrayOfInstructions.push(e);
			changeContent(e);
		}
	}

// })();