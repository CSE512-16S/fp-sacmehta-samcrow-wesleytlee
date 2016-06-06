
/**
 * A group of zero or more filter controls
 *
 * availableFilters provides the filters that the user can add.
 * It must be an array of objects. Each object in the array must have a 'name'
 * property, containing the text to display in the add menut, and a 'filter'
 * property, containing a FilterControl
 */
function FilterGroup(availableFilters) {
    this.controls = []
    this.root = document.createElement('div')

    var filterGroup = this
    var createFilterAddMenu = function() {
        var select = document.createElement('select')
        select.classList.add('filter-add-menu')

        var initial = document.createElement('option')
        initial.textContent = 'Add a filter...'
        initial.setAttribute('value', 0)
        select.appendChild(initial)
        var i = 1
        for (var filter of availableFilters) {
            var option = document.createElement('option')
            option.textContent = filter.name
            option.setAttribute('value', i)
            option.filter = filter.filter

            select.appendChild(option)
            i++
        }

        select.onchange = function() {
            if (this.value == 0) {
                return
            }
            var selectedOption = this.childNodes[this.value]
            selectedOption.setAttribute('disabled', 'disabled')
            var filterToAdd = selectedOption.filter
            console.log(filterToAdd)
            filterGroup.addFilter(filterToAdd)
            this.value = 0
        }

        return select
    }

    this.filterAddMenu = createFilterAddMenu()
}

FilterGroup.prototype.addFilter = function(filter) {
    var thisGroup = this
    filter.setOnRemovePressed(function() {
        thisGroup.removeFilter(filter)
    })
    this.controls.push(filter)
    this.root.appendChild(filter.getRoot())
}

FilterGroup.prototype.removeFilter = function(control) {
    for (var i = 0; i < this.controls.length; i++) {
        if (this.controls[i] === control) {
            this.controls.splice(i, 1)
            this.root.children[i].remove()
            break
        }
    }
    // Enable the select menu item for this filter
    for (var i = 0; i < this.filterAddMenu.children.length; i++) {
        var option = this.filterAddMenu.children[i];
        if (option.filter === control) {
            option.removeAttribute('disabled')
        }
    }
}

FilterGroup.prototype.getPredicate = function() {
    var predicates = []
    for (var control of this.controls) {
        predicates.push(control.getPredicate())
    }
    // Call new And() with predicates as the arguments
    return new (Function.prototype.bind.apply(And, [null].concat(predicates)))
}

FilterGroup.prototype.getRoot = function() {
    return this.root
}

FilterGroup.prototype.reset = function() {
    for (var control of this.controls) {
        control.reset()
    }
}

FilterGroup.prototype.getFilterAddMenu = function() {
    return this.filterAddMenu
}
