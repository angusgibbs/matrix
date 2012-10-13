# Matrix#multiply(*matrix*)

`Matrix#multiply()` accepts **one** parameter, a two-dimensional array or Matrix object.

**This methods modifies the current Matrix object.**

## Errors

`#multiply()` will throw an error if:

1. The number of columns on the original matrix does not equal the number of rows on the matrix passed, as the multiplication is impossible.
2. The argument passed is not a valid Matrix object.

## Examples

```javascript
// Create a couple new Matrix objects
var m1 = new Matrix([
	[1, 2],
	[3, 4],
	[5, 6]
]);

var m2 = new Matrix([
	[1, 2, 3],
	[4, 5, 6]
]);

// #multiply() will multiply two matrices
m1.multiply(m2);

// #multiply() also accepts a two-dimensional array
m1.multiply([
	[1, 2, 3],
	[4, 5, 6]
]);

// will throw an error if the argument passed is not a valid Matrix object
m1.multiply('hi');
// => Throws an error

// will throw an error if the dimensions are invalid
m1.multiply(new Matrix(5, 5));
// => Throws an error
```