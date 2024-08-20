class OutOfRangeError extends Error {
		    constructor(arg) {
		        super(`Expression should only consist of integers and +-/* characters and not < ${arg} >`);
		        this.name = 'OutOfRangeError';
		    }
		}

		class InvalidExprError extends Error {
		    constructor() {
		        super('Expression should not have an invalid combination of operators');
		        this.name = 'InvalidExprError';
		    }
		}

		function evalString(expression) {
		    try {
		        expression = expression.trim();

		        const validChars = /^[0-9+\-*/\s]+$/;
		        if (!validChars.test(expression)) {
		            const invalidChar = expression.match(/[^0-9+\-*/\s]/);
		            throw new OutOfRangeError(invalidChar[0]);
		        }

		        const invalidCombination = /(\+\+|--|\*\*|\/\/|\+-|\+\/|\/\+|\-\/|\+\*|\*\+|\/\*)/;
		        if (invalidCombination.test(expression)) {
		            throw new InvalidExprError();
		        }

		        const invalidStartEnd = /^[+\/*]|[+\/*\-]$/;
		        if (invalidStartEnd.test(expression)) {
		            throw new SyntaxError('Expression should not start or end with an invalid operator');
		        }

		        const result = eval(expression);
		        return result;

		    } catch (error) {
		        console.error(`${error.name}: ${error.message}`);
		        return `${error.name}: ${error.message}`;
		    }
		}

		function evaluateExpression() {
		    const expression = document.getElementById('expression').value;
		    const result = evalString(expression);
		    document.getElementById('result').innerText = result !== undefined ? result : 'Invalid Expression';
		}