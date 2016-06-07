
/**
 * Creates a data set
 * @param rows a list of entries to store
 */
function DataSet(rows) {
    this.rows = rows
}

/**
 * Filters this data set and returns a new DataSet containing the elements
 * selected by a predicate.
 * @param predicate a predicate to select the values to include. This may be
 * a function that takes a value and returns true or false, or it may be
 * an object with a matches function that takes a value and returns true or
 * false.
 */
DataSet.prototype.filter = function(predicate) {
    var predicateFunction;
    if (typeof predicate === 'object') {
        predicateFunction = function(e) { return predicate.matches(e) }
    } else if (typeof predicate === 'function') {
        predicateFunction = predicate
    } else {
        throw "Invalid predicate"
    }

    var subset = []
    for (var i = 0; i < this.rows.length; i++) {
        var element = this.rows[i];
        if (predicateFunction(element) === true) {
            subset.push(element)
        }
    }
    return new DataSet(subset)
}
