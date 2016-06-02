
/**
 * A predicate that matches anything
 */
function All() {}
All.prototype.matches = function(e) {
    return true
}

/**
* A predicate that matches values with type object. Does not match null.
*/
function IsObject() {}

IsObject.prototype.matches = function(e) {
    return e && typeof e === 'object'
}

/**
* A predicate that matches objects that have fields of the provided name.
*/
function HasField(name) {
    this.name = name
}
HasField.prototype.matches = function(e) {
    return e && (typeof e === 'object') && e.hasOwnProperty(this.name)
}

/**
* A predicate that matches objects that have fields with the provided name
* with values that exactly match the provided value
*/
function FieldMatches(name, value) {
    this.name = name
    this.value = value
}
FieldMatches.prototype.matches = function(e) {
    return e && (typeof e === 'object') && (e[this.name] === this.value)
}

/**
 * A predicate that matches values matched by all inner predicates.
 * An object with no inner predicates matches everything.
 *
 * This constructor takes any number of predicates.
 */
function And() {
    this.predicates = Array.from(arguments)
}
And.prototype.matches = function(e) {
    for (var i = 0; i < this.predicates.length; i++) {
        if (!this.predicates[i].matches(e)) {
            return false
        }
    }
    return true
}
/**
 * A predicate that matches values matched by any inner predicate.
 * An object with no inner predicates matches nothing.
 *
 * This constructor takes any number of predicates.
 */
function Or() {
    this.predicates = Array.from(arguments)
}
Or.prototype.matches = function(e) {
    for (var i = 0; i < this.predicates.length; i++) {
        if (this.predicates[i].matches(e)) {
            return true
        }
    }
    return false
}

/**
 * A predicate that matches objects with a property having a numerical value
 * in a range. The range is inclusive.
 *
 * @param property the name of the property
 * @param min the minimum value of the property
 * @param max the maximum value of the property
 */
function Range(property, min, max) {
    self.property = property
    self.min = min
    self.max = max
}

Range.prototype.matches = function(e) {
    if (typeof e !== 'object') {
        return false
    }
    if (!e) {
        return false
    }
    var value = e[self.property]
    if (!value) {
        return false
    }
    if (typeof value !== 'number') {
        value = parseFloat(value)
        if (Number.isNaN(value)) {
            console.warn('Range filter: Value NaN or could not be parsed')
            return false
        }
    }
    return value >= self.min && value <= self.max
}
