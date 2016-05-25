
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
 * A predicate that matches values matched by all inner predicates
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
 * A predicate that matches values matched by either inner predicate
 */
function Or(p1, p2) {
    this.p1 = p1
    this.p2 = p2
}
Or.prototype.matches = function(e) {
    return this.p1.matches(e) || this.p2.matches(e)
}
