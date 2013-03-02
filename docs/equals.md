# Matrix#equals(*n*)

`Matrix#equals()` accepts one parameter, a Matrix object or a two dimensional array that will converted into a Matrix object. It will return true if the matrix passed has the same dimensions and contents as the current matrix, and false otherwise.

## Errors

None.

## Examples

```javascript
var a = new Matrix([[2, 2], [1, 1]]);
var b = new Matrix([[3, 3], [2, 2]]);
var c = new Matrix([[3, 3], [2, 2]]);
var d = new Matrix([[3], [2]]);

a.equals(b);
// => false

b.equals(c);
// => true

// #equals() also accepts a two-dimensional array
b.equals([[3, 3], [2, 2]]);
// => true

c.equals(d);
// => false
```