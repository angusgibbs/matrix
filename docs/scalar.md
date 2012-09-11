# Matrix#scalar(*scalar*)

`Matrix#scalar()` accepts a single numerical value, and multiplies each element in the array by that value.

**This method modifies the current Matrix object.**

## Errors

`#scalar()` will throw an error if the parameter passed is not a numeric value.

## Examples

```javascript
// Create a new Matrix object
var m = new Matrix([
	[2,  4,  6],
	[8, 10, 12],
]);

// #scalar() will multiply each element in the matrix by the scalar
m.scalar(3);

// #scalar() will throw an error if the scalar is not numeric
m.scalar('hi');
// => Throws an error
```