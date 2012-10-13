# Matrix#subtract(*matrix*)

`Matrix#subtract()` accepts an unlimited number of parameters. Each of these parameters must be a two-dimensional array or a Matrix object.

**This method modifies the current Matrix object.**

## Errors

`#subtract()` will throw an error if the dimensions of the matrix passed do not match the dimensions of the original matrix.

## Examples

```javascript
// Create a new Matrix object
var m1 = new Matrix(2, 2);

// #subtract() accepts a two-dimensional array
m1.subtract([
	[1, 1],
	[1, 1]
]);

// #subtract() also accepts a Matrix object
var m2 = new Matrix([
	[1, 2],
	[3, 4]
]);

m1.subtract(m2);

// #subtract() accepts multiple parameters
m1.subtract(m2, [[4,3],[2,1]]);

// This will throw an error because the matrix to subtract has different dimensions
m1.subtract(new Matrix(3, 3));
```