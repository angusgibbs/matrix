# Matrix#determinant()

`Matrix#determinant()` returns the determinant of the Matrix object.

## Errors

`#determinant()` will throw an error if the matrix does not have the same number of rows as columns, as finding the determinant of a non-square matrix is impossible.

## Examples

```javascript
console.log(new Matrix([
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
]).determinant());
// => Outputs 0

console.log(new Matrix([
	[1, 2, 3],
	[4, 5, 6]
]).determinant());
// => Throws Error: Invalid Dimensions
```