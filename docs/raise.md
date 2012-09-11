# Matrix#raise(*power*)

`Matrix#raise()` accepts an integer that is greater than or equal to two.

**This method modifies the current Matrix object.**

## Errors

`#raise()` will throw an error if the power is not an integer, the power is less than 2, or if the matrix does not have an equal number of rows and columns.

## Aliases

A couple of common `raise` calls are aliased as their own functions; calling `square()` on a Matrix object is the same as calling `raise(2)`, and calling `cube()` is the same as calling `raise(3)`. Just some syntactic sugar.

## Examples

```javascript
// Create a new Matrix object
var m = new Matrix([
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
]);

// #raise() will raise a square matrix to the given power
m.raise(3);

// #raise() will throw an error if the power is not an integer
m.raise('hi');
// => Throws an error

// #raise() will throw an error if the power is less than two
m.raise(1);
// => Throws an error

// #raise() will throw an error if the matrix is not a square matrix
new Matrix(3, 2).raise(2);
// => Throws an error
```