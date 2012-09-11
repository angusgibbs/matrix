# Matrix#add(*matrix...*)

`Matrix#add()` accepts an unlimited number of parameters. Each of these parameters must be a two-dimensional array or a Matrix object.

**This method modifies the current Matrix object.**

## Errors

`#add()` will throw an error if the dimensions of **any** of the matrices passed do not match the dimensions of the original matrix.

## Examples

```javascript
// Create a new Matrix object
var m1 = new Matrix(2, 2);

// #add() accepts a two-dimensional array
m1.add([
	[1, 1],
	[1, 1]
]);

// #add() also accepts a Matrix object
var m2 = new Matrix([
	[1, 2],
	[3, 4]
]);

m1.add(m2);

// #add() accepts multiple parameters
m1.add(m2, [[4,3],[2,1]]);

// This will throw an error because the matrix to add has different dimensions
m1.add(new Matrix(3, 3));
```