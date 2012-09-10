# Matrix.js

## About

[Matrix.js](http://angusgibbs.github.com/matrix/) is a JavaScript utility library
for working with [matrices](http://wikipedia.org/wiki/Matrix_(Mathematics\)). It
currently supports:

* Adding matrices
* Subtracting matrices
* Multiplying matrices
* Finding the determinant of a *n* by *n* matrix
* Creating a *n* by *n* identity matrix
* Raising a *n* by *n* matrix to the *x<sup>th</sup>* power

For more information, see the [docs](http://angusgibbs.github.com/matrix/docs/).

## Contributing

Patches welcome, just make sure there are matching unit tests. Tests use
[mocha](http://visionmedi.github.com/mocha/) with [expect.js](https://github.com/LearnBoost/expect.js).
One particular feature that still needs to be implemented is finding the inverse
of a matrix. I have an implementation that can invert either a 2 by 2 or a 3 by 3 matrix,
but I am still looking for how to invert a *n* by *n* matrix.