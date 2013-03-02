# Matrix#inverse()

`Matrix#inverse()` does not take any parameters.

## Errors

`#inverse()` will throw an error if the matrix is not square (i.e., does not have the same number of rows and columns), or if the matrix is a 1x1.

## Examples

```javascript
new Matrix([
	[2, 0, -1],
	[2, 1,  1],
	[3, 4,  4]
]).inverse().toArray();
// => [[ 0, .8, -.2], [ 1, -2.2, .8], [-1, 1.6, -.4]]
```