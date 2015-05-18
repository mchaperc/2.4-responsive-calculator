// (function() {

	var calculation = 0;
	var displayNumber = '0';
	var pendingOperation = undefined;
	var $display = document.querySelector('.display-output');

	function numberPressed(event) {
		var number = Number(event.target.innerHTML);
		updateDisplayAndCalc(number);
	}

	// Operations for '.' and '%' don't work as designed

	function operatorPressed(event) {
		var operator = event.target.getAttribute('data-key');
		
		if (operator === 'AC') {
			calculation = 0;
			displayNumber = '0';
			pendingOperation = undefined;
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
		} else if (operator === '%') {
			displayNumber = (Number(displayNumber) / 100).toString();
			$display.textContent = displayNumber;
			calculation = Number(displayNumber);
		} else {

			switch(pendingOperation) {
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
				calculation = Number(calculation.toString() + number.toString());
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
		});
	}, false);


// })();