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

	function numberPressed(event) {
		var button = event.target;
		var number = button.textContent;
		arrayOfInstructions.push(number);
		displayNumber+=number;
		changeContent(displayNumber);
	}

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

	function equals() {
		result = eval(arrayOfInstructions.join(''));
		arrayOfInstructions = [result];
		changeContent(result);
	}

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

	function clearInstructions() {
		arrayOfInstructions = [];
		result = 0;
	}

	function changeContent (result) {
    	var myelement = document.getElementById("result");
    	myelement.innerHTML = result;
    }

// })();

// numberPressed('9');
// console.log(arrayOfInstructions);
// console.log(result);

// operatorPressed('+');
// console.log(arrayOfInstructions);
// console.log(result);

// numberPressed('9');
// console.log(arrayOfInstructions);
// console.log(result);

// operatorPressed('+');
// console.log(arrayOfInstructions);
// console.log(result);

// numberPressed('10');
// console.log(arrayOfInstructions);
// console.log(result);

// operatorPressed('*');
// console.log(arrayOfInstructions);
// console.log(result);

// numberPressed('4');
// console.log(arrayOfInstructions);
// console.log(result);

// operatorPressed('-');
// console.log(arrayOfInstructions);
// console.log(result);

// clearInstructions();
// console.log(arrayOfInstructions);
// console.log(result);