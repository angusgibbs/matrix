# Getting Started

## Installation

Installing with Matrix is pretty easy. You can [download the latest copy from GitHub](https://raw.github.com/angusgibbs/matrix/master/lib/matrix.js), or, if you want to use Matrix with [Node.js](http://nodejs.org), install it with [NPM](https://npmjs.org):

```bash
npm install matrixjs
```

## Using matrix

If you are using Matrix for a client-side project, simply include Matrix at the
bottom of your HTML file with the rest of your scripts:

```html
<script src="path/to/matrix.js"></script>
```

Or, if you are using Matrix on node, require it:

```javascript
var Matrix = require('matrixjs');
```

Matrix also works with AMD loaders, such as [RequireJS](http://requirejs.org). Just require it like you normally would:

```javascript
require('path/to/matrix.js', function(Matrix) {
	// Do stuff with Matrix here
});
```

## Creating a Matrix object

A Matrix object is created by calling `new Matrix`. You have two options when
creating a new Matrix object:

1. **A two-dimensional array with the data**

	Example:

	```javascript
	var m = new Matrix([
		[1, 2, 3],
		[4, 5, 6]
	]);
	```

2. **A row and column count**&mdash;this will create a Matrix object with the
desired dimensions with zeros at each index.

	Example:

	```javascript
	var m = new Matrix(2, 2);
	```

### Creating an identity Matrix

When creating a new Matrix object you can easily create an *n* by *n* matrix by
calling `new Matrix.identity`, like so:

```javascript
var m = new Matrix.identity(3);
// => Creates a new 3x3 identity matrix
```

## Working with a Matrix object

Once you have created your Matrix object, these methods are available to you:

* [add](add.md): Adds two or more matrices to the current matrix
* [subtract](subtract.md): Subtracts a matrix from the current matrix
* [multiply](multiply.md): Multiplies the current matrix by another matrix
* [determinant](determinant.md): Finds the determinant of the current *n* by *n* matrix
* [raise](raise.md): Raises the current matrix to the *x<sup>th</sup>* power
  * `raise` comes with a couple helper functions&mdash;calling `square()` is the same thing as calling `raise(2)`, and calling `cube()` is the same thing as calling `raise(3)`
* [scalar](scalar.md): Multiplies each element in the matrix by a scalar
* [inverse](inverse.md): Inverts an *n* by *n* matrix
* [equals](equals.md): Compares against another matrix

### Important note about all Matrix methods

*All methods on the Matrix methods modify the original object.* If you do not want to modify the original object, you can call `clone()` on the matrix to get a fresh copy of the matrix that will not affect the original.

### A note on the use of errors

By default, Matrix will throw an error if the API is used improperly (e.g. the wrong arguments are passed) or if the operation that was requested is not possible (e.g. finding the determinant of a non-square matrix). To turn off this error reporting, set `Matrix.silent` to true.

### Method chaining

Methods can be chained together. For instance:

```javascript
new Matrix.identity(3)
	.add([
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	])
	.subtract([
		[9, 8, 7],
		[6, 5, 4],
		[3, 2, 1]
	])
	.scalar(2);
```

### Getting and setting elements of the matrix

Matrix elements can be get and set using bracket notation. (Remember that row and column numbers are zero indexed.) For example:

```javascript
// Create a 2 by 2 all zero matrix
var m = new Matrix(2, 2);

// Set m[1,1] to 42
m[1][1] = 42;

// Retrieve the value of m[1,0]
console.log(m[1][0]);
// => Outputs 0
```