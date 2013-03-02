/*! Matrix v0.0.0 | https://github.com/angusgibbs/matrix/blob/master/LICENSE */
(function() {
	// Public: Creates a new Matrix object.
	//
	// data - A two dimensional array of the matrix contents.
	//
	// Throws an error if `data` is not a valid two-dimensional numeric array.
	// Returns a new Matrix object.
	var Matrix = function(data) {
		// Check if the matrix was just given a row and column value - if so,
		// create an all zero matrix with the specified dimensions.
		var args = arguments;
		if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
			// Store the dimensions
			this.rows = args[0];
			this.cols = args[1];

			// Set all indices to 0
			this._setData(function() {
				return 0;
			});

			return;
		}

		// Throw an error if `data` is not an array
		if (!Array.isArray(data)) {
			throwError('Array must be passed');
		}

		// Store a reference to this
		var thiz = this;

		// Store the matrix rows
		thiz.rows = data.length;

		// Store the data onto the matrix object
		data.forEach(function(row, rowNum) {
			// Throw an error if the row is not an array
			if (!Array.isArray(row)) {
				throwError('The array passed must be a two-dimensional array');
			}

			// Store the matrix cols if it hasn't been stored
			if (!thiz.cols) {
				thiz.cols = row.length;
			}

			// Initialize an array at the row number
			thiz[rowNum] = [];

			row.forEach(function(col, colNum) {
				// Throw an error if the column is not a number
				if (typeof col !== 'number') {
					throwError('The matrix fields must be numeric');
				}

				// Store the column onto the matrix object
				thiz[rowNum][colNum] = col;
			});
		});
	};

	// Public: Determines whether errors should be thrown on bad data.
	//
	// Default: false.
	Matrix.silent = false;

	// Internal: Creates a new matrix without the specified row or column.
	//
	// excludeRow - The row to exclude.
	// excludeCol - The column to exclude.
	//
	// Returns the new matrix.
	Matrix.prototype._submatrix = function(excludeRow, excludeCol) {
		// Create an array that will be used to initialize the new matrix
		var data = [];

		// Go through each of the rows
		for (var i = 0, row = 0; i < this.rows; i++) {
			// Skip if it's the row to exclude
			if (i === excludeRow) {
				continue;
			}

			// Initialize an array for the current column
			data[row] = [];

			// Go through each of the columns
			for (var j = 0, col = 0; j < this.cols; j++) {
				// Skip if it was the column to exclude
				if (j === excludeCol) {
					continue;
				}

				// Save the old matrix's value at the current row/column to the
				// new array
				data[row][col] = this[i][j];

				// Increment cols
				col++;
			}

			// Increment rows
			row++;
		}

		return new Matrix(data);
	};

	// Internal: Computes the determinant of a matrix.
	//
	// matrix - The matrix to get the determinant of.
	//
	// Returns the determinant.
	function determinant(matrix) {
		// Check if the matrix is a 2x2
		if (matrix.rows === 2 && matrix.cols === 2) {
			return (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]);
		}
		// Otherwise, reduce the size by 1 and recurse
		else {
			var det = 0;
			for (var i = 0; i < matrix.cols; i++) {
				det += matrix[0][i] * (i % 2 === 0 ? 1 : -1) * determinant(matrix._submatrix(0, i));
			}

			return det;
		}
	}

	// Public: Computes the determinant of the matrix.
	//
	// Throws an error if the matrix does not have the same number of rows as
	// columns.
	// Returns the determinant.
	Matrix.prototype.determinant = function() {
		// Throw an error if the matrix does not have the same number or rows as
		// columns
		if (this.rows !== this.cols) {
			throwError('Cannot compute the determinant of a non-square matrix');
		}

		return determinant(this);
	};

	// Public: Multiplies the current matrix by the matrix passed.
	//
	// matrix - The matrix to multiply. This can be a Matrix
	//          object or a two-dimensional array.
	//
	// Throws an error if there are invalid dimensions or if the matrix passed
	// is not a valid Matrix object.
	// Returns nothing.
	Matrix.prototype.multiply = function(matrix) {
		// If matrix is an array, convert it to a Matrix
		if (Array.isArray(matrix)) {
			matrix = new Matrix(matrix);
		}

		// Throw an error if the matrix is not a valid Matrix object
		if (!matrix instanceof Matrix) {
			throwError('Argument passed is not a valid Matrix object');
		}

		// Throw an error if there are invalid dimensions (matrix one columns
		// must equal matrix two rows)
		if (this.cols !== matrix.rows) {
			throwError('Invalid dimensions');
		}

		// Create the product matrix
		var product = new Matrix(this.rows, matrix.cols);

		// Compute the product
		for (var row = 0; row < this.rows; row++) {
			for (var col = 0; col < matrix.cols; col++) {
				var square = 0;

				for (var i = 0; i < this.cols; i++) {
					square += this[row][i] * matrix[i][col];
				}

				product[row][col] = square;
			}
		}

		return this._setData(product);
	};

	// Public: Multiplies each element in the matrix by a scalar.
	//
	// c - The scalar to multiply by.
	//
	// Throws an error if the scalar is not numeric.
	// Returns nothing.
	Matrix.prototype.scalar = function(c) {
		// Throw an error if the scalar is not numeric
		if (typeof c !== 'number') {
			throwError('The scalar must be numeric');
		}

		for (var row = 0; row < this.rows; row++) {
			for (var col = 0; col < this.cols; col++) {
				this[row][col] *= c;
			}
		}

		return this;
	};

	// Public: Computes the sum of two or more matrices.
	//
	// Throws an error if the two matrices do not have valid dimensions.
	// Returns nothing.
	Matrix.prototype.add = function() {
		// Get all the matrices to add to the current matrix
		var matrices = Array.prototype.slice.call(arguments, 0);

		// Save a reference to this
		var thiz = this;

		// Add each of the matrices to the current matrix
		matrices.forEach(function(matrix) {
			// Convert matrix to a Matrix object if it is an array
			if (Array.isArray(matrix)) {
				matrix = new Matrix(matrix);
			}

			// Throw an error if the dimensions do not match
			if (thiz.rows !== matrix.rows || thiz.cols !== matrix.cols) {
				throwError('Matrix dimensions do not match');
			}

			for (var row = 0; row < thiz.rows; row++) {
				for (var col = 0; col < thiz.cols; col++) {
					thiz[row][col] += matrix[row][col];
				}
			}
		});

		return this;
	};

	// Public: Computes the difference of two or more matrices.
	//
	// Throws an error if the two matrices do not have valid dimensions.
	// Returns nothing.
	Matrix.prototype.subtract = function(matrix) {
		// Get all the matrices to subtract from the current matrix
		var matrices = Array.prototype.slice.call(arguments, 0);

		// Save a reference to this
		var thiz = this;

		// Subtract each of the matrices from the current matrix
		matrices.forEach(function(matrix) {
			// Convert matrix to a Matrix object if it is an array
			if (Array.isArray(matrix)) {
				matrix = new Matrix(matrix);
			}

			// Throw an error if the dimensions do not match
			if (thiz.rows !== matrix.rows || thiz.cols !== matrix.cols) {
				throwError('Matrix dimensions do not match');
			}

			for (var row = 0; row < thiz.rows; row++) {
				for (var col = 0; col < thiz.cols; col++) {
					thiz[row][col] -= matrix[row][col];
				}
			}
		});

		return this;
	};

	// Public: Raises the matrix to the nth power.
	//
	// power - The power to raise the matrix to.
	//
	// Throws an error if the power is not an integer greater than one.
	// Returns nothing.
	Matrix.prototype.raise = function(power) {
		// Throw an error if the power is not an integer
		if (typeof power !== 'number' || Math.round(power, 0) !== power) {
			throwError('The power must be an integer');
		}

		// Throw an error if the power is not >= 2
		if (power < 2) {
			throwError('The power must be greater than or equal to 1');
		}

		// Compute the power
		var product = this.clone();
		while (--power) {
			product.multiply(this);
		}

		return this._setData(product);
	};

	// Public: Squares the matrix.
	//
	// Returns nothing.
	Matrix.prototype.square = function() {
		this.raise(2);

		return this;
	};

	// Public: Cubes the matrix.
	//
	// Returns nothing.
	Matrix.prototype.cube = function() {
		this.raise(3);

		return this;
	};

	// Public: Computes the inverse of the matrix.
	//
	// Returns nothing.
	Matrix.prototype.inverse = function() {
		// Throw an error if the matrix is either not square or is singular
		if (!this.isSquare() || this.isSingular()) {
			throwError('The matrix must be a square matrix with a size of at least 2x2');
		}

		// Declare variables
		var ratio;
		var a;
		var n = this.rows;

		// Put an identity matrix to the right of matrix
		this.cols = 2 * n;
		for (var i = 0; i < n; i++) {
			for (var j = n; j < 2 * n; j++) {
				if (i === (j - n)) {
					this[i][j] = 1;
				}
				else {
					this[i][j] = 0;
				}
			}
		}

		for (var i = 0; i < n; i++) {
			for (var j = 0; j < n; j++) {
				if (i !== j) {
					ratio = this[j][i] / this[i][i];
					for (var k = 0; k < 2 * n; k++) {
						this[j][k] -= ratio * this[i][k];
					}
				}
			}
		}

		for (var i = 0; i < n; i++) {
			a = this[i][i];
			for (var j = 0; j < 2 * n; j++) {
				this[i][j] /= a;
			}
		}

		// Rmove the left-hand identity matrix
		for (var i = 0; i < n; i++) {
			this[i].splice(0, n);
		}
		this.cols = n;

		return this;
	};

	// Public: Returns whether or not the current matrix equals
	// the passed matrix.
	//
	// Returns a boolean.
	Matrix.prototype.equals = function(m) {
		// Convert the argument to a Matrix object if it was an array
		if (Array.isArray(m)) {
			m = new Matrix(m);
		}

		// Return false if the dimensions do not match
		if (this.rows !== m.rows || this.cols !== m.cols) {
			return false;
		}

		// Check each location
		for (var row = 0; row < this.rows; row++) {
			for (var col = 0; col < this.cols; col++) {
				if (this[row][col] !== m[row][col]) {
					return false;
				}
			}
		}

		return true;
	};

	// Public: Decides whether or not the matrix is square.
	//
	// Returns a boolean of whether or not the matrix is square.
	Matrix.prototype.isSquare = function() {
		return this.rows === this.cols;
	};

	// Public: Decides whether or not the matrix is a 1x1.
	//
	// Returns a boolean of whether or not the matrix is singular.
	Matrix.prototype.isSingular = function() {
		return this.rows === 1 && this.cols === 1;
	};

	// Public: Clones the matrix.
	//
	// Returns a new Matrix object.
	Matrix.prototype.clone = function() {
		return new Matrix(this.toArray());
	};

	// Public: Override Matrix#toJSON() and Matrix#toArray to return a
	// two-dimensional array with the matrix data.
	//
	// Returns a two-dimensional array with the matrix data.
	Matrix.prototype.toJSON = Matrix.prototype.toArray = function() {
		var result = [];

		for (var row = 0; row < this.rows; row++) {
			result[row] = [];

			for (var col = 0; col < this.cols; col++) {
				result[row][col] = this[row][col];
			}
		}

		return result;
	};

	// Internal: Sets the matrix's data to the object passed.
	//
	// data - A two-dimensional array or Matrix object with the data to set on
	//        the current object.
	//
	// Returns nothing.
	Matrix.prototype._setData = function(data) {
		var row, col;

		// Remove the old data from the matrix
		for (row = 0; row < this.rows; row++) {
			delete this[row];
		}

		// Convert the data into a Matrix object if it is an array
		if (Array.isArray(data)) {
			data = new Matrix(data);
		}

		// Throw an error if data is not a valid Matrix object
		if (!data instanceof Matrix && typeof data !== 'function') {
			throwError('The data to set must be either a Matrix object, a two dimensional array, or a function');
		}

		// Set the new row and column counts
		if (typeof data !== 'function') {
			this.rows = data.rows;
			this.cols = data.cols;
		}

		// Set the new data on the matrix
		for (row = 0; row < this.rows; row++) {
			this[row] = [];

			for (col = 0; col < this.cols; col++) {
				this[row][col] = typeof data === 'function' ? data.call(this, row, col) : data[row][col];
			}
		}

		return this;
	};

	// Public: Creates an n by n identity Matrix object.
	//
	// n - The height and width of the matrix.
	//
	// Returns a new Matrix object.
	Matrix.identity = function(n) {
		// Create the matrix
		var m = new Matrix(n, n);

		// Set the diagonals to one, everything else to 0
		return m._setData(function(row, col) {
			return row === col ? 1 : 0;
		});
	};

	// Internal: Throws an error if silent is set set to false.
	//
	// msg - The error message.
	//
	// Returns nothing.
	function throwError(msg) {
		if (!Matrix.silent) {
			throw new Error(msg);
		}
	}

	// Define Matrix for AMD loaders
	if (typeof define === 'function') {
		define(function() {
			return Matrix;
		});
	}
	// Expose Matrix for node
	else if (typeof module !== 'undefined' && module.exports) {
		module.exports = Matrix;
	}
	// Otherwise write to window
	else {
		window.Matrix = Matrix;
	}
}());