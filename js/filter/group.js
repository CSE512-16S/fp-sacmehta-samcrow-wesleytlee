
/**
 * A group of zero or more filter controls
 */
function FilterGroup() {
    this.controls = []
    this.root = document.createElement('div')
}

FilterGroup.prototype.addFilter = function(filter) {
    if (this.callback) {
        filter.setOnChange(this.callback)
    }
    this.controls.push(filter)
    this.root.appendChild(filter.getRoot())
}

FilterGroup.prototype.setOnChange = function(callback) {
    this.callback = callback
    for (var i = 0; i < this.controls.length; i++) {
        this.controls[i].setOnChange(callback)
    }
}

FilterGroup.prototype.getPredicate = function() {
    var predicates = []
    for (var i = 0; i < this.controls.length; i++) {
        predicates.push(this.controls[i].getPredicate())
    }
    // Call new And() with predicates as the arguments
    return new (Function.prototype.bind.apply(And, [null].concat(predicates)))
}

FilterGroup.prototype.getRoot = function() {
    return this.root
}
