
/*
* Filter controls
*
* Each filter control has a root DOM element and a predicate.
*/

var createRemoveButton = function() {
    var button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.textContent = 'X'
    button.classList.add('filter-remove-button')
    button.setAttribute('title', 'Remove filter')
    return button
}

function FilterControl(property) {
    this.property = property
    this.removeButton = createRemoveButton()
}

FilterControl.prototype = {
    setOnRemovePressed: function(callback) {
        this.removeButton.onclick = callback
    }
}

/**
* Creates a boolean filter to filter on a property
* @param property the property to find
* @param label the label to display
*/
function BooleanFilter(property, label) {
    FilterControl.call(this, property)

    var createOptions = function() {
        var optAny = document.createElement('option')
        optAny.setAttribute('value', 'any')
        optAny.textContent = 'Any'
        var optTrue = document.createElement('option')
        optTrue.setAttribute('value', 'true')
        optTrue.textContent = 'True'
        var optFalse = document.createElement('option')
        optFalse.setAttribute('value', 'false')
        optFalse.textContent = 'False'
        return [optAny, optTrue, optFalse]
    }

    // Create DOM
    var linkId = 'BooleanFilter_' + property + '_' + label
    var div = document.createElement('div')
    div.classList.add('boolean-filter')
    var select = document.createElement('select')
    select.setAttribute('id', linkId)
    var options = createOptions()
    for (var i = 0; i < options.length; i++) {
        select.appendChild(options[i])
    }
    var labelElement = document.createElement('label')
    labelElement.textContent = label
    labelElement.setAttribute('for', linkId)
    div.appendChild(labelElement)
    div.appendChild(select)

    div.appendChild(this.removeButton)

    this.root = div
    this.select = select
}
BooleanFilter.prototype = {
    getRoot: function() {
        return this.root
    },
    reset: function() {
        this.select.value = 'any'
    },
    getPredicate: function() {
        var selection = this.select.value
        if (selection == 'true') {
            return new FieldMatches(this.property, true)
        } else if (selection == 'false') {
            return new FieldMatches(this.property, false)
        } else {
            return new All()
        }
    },
    setOnRemovePressed: FilterControl.prototype.setOnRemovePressed,
}

/**
* A filter that matches a string property with a predefined value
* @param property the property name to check
* @param values an array of values of the property to match
* @param label a label to display
*/
function StringFilter(property, values, label) {
    FilterControl.call(this, property)

    var createSelect = function() {
        var select = document.createElement('select')

        var anyOption = document.createElement('option')
        anyOption.setAttribute('value', '__any__')
        anyOption.textContent = 'Any'
        select.appendChild(anyOption)

        for (var i = 0; i < values.length; i++) {
            var value = values[i]
            var option = document.createElement('option')
            option.setAttribute('value', value)
            option.textContent = value
            select.appendChild(option)
        }

        return select;
    }

    this.select = createSelect();
    var linkId = 'StringFilter_' + property
    this.select.setAttribute('id', linkId)
    var labelElement = document.createElement('label')
    labelElement.textContent = label
    labelElement.setAttribute('for', linkId)

    var root = document.createElement('div')
    root.classList.add('list-filter')
    root.appendChild(labelElement)
    root.appendChild(this.select)

    root.appendChild(this.removeButton)

    this.root = root
}
StringFilter.prototype = {
    getRoot: function() {
        return this.root
    },
    reset: function() {
        this.select.value = '__any__'
    },
    getPredicate: function() {
        var selection = this.select.value
        if (selection == '__any__') {
            return new All()
        } else {
            return new FieldMatches(this.property, selection)
        }
    },
    setOnRemovePressed: FilterControl.prototype.setOnRemovePressed,
}

/**
* Allows the user to select part of a range of numerical values
*
* @param property the property name
* @param min the minimum value to allow the user to select
* @param max the maximum value to allow the user to select
* @param step the minimum amount by which to change the value
* @param label the label to display
*/
function RangeFilter(property, min, max, step, label) {
    FilterControl.call(this, property)

    var createSlider = function() {
        var input = document.createElement('input')
        input.setAttribute('type', 'range')
        input.setAttribute('min', min)
        input.setAttribute('max', max)
        input.setAttribute('step', step)
        input.classList.add('range-filter-slider')
        return input
    }
    var createLabel = function(text) {
        var span = document.createElement('span')
        span.appendChild(new Text(text))
        span.classList.add('range-filter-label')
        return span
    }
    var createIndicator = function() {
        var span = document.createElement('span')
        span.classList.add('range-filter-indicator')
        return span
    }

    this.minSlider = createSlider()
    this.minSlider.value = min
    var minIndicator = createIndicator()
    this.maxSlider = createSlider()
    this.maxSlider.value = max
    var maxIndicator = createIndicator()

    var updateMinIndicator = function() {
        minIndicator.textContent = this.minSlider.value
    }
    var updateMaxIndicator = function() {
        maxIndicator.textContent = this.maxSlider.value
    }

    var self = this
    this.minSlider.onmousemove = function() { updateMinIndicator.apply(self) }
    this.minSlider.onchange = this.minSlider.onmousemove
    this.maxSlider.onmousemove = function() { updateMaxIndicator.apply(self) }
    this.maxSlider.onchange = this.maxSlider.onmousemove

    this.root = document.createElement('div')
    this.root.appendChild(createLabel(label))
    var minContainer = document.createElement('div')
    minContainer.appendChild(createLabel('Min'))
    minContainer.appendChild(this.minSlider)
    minContainer.appendChild(minIndicator)
    this.root.appendChild(minContainer)
    var maxContainer = document.createElement('div')
    maxContainer.appendChild(createLabel('Max'))
    maxContainer.appendChild(this.maxSlider)
    maxContainer.appendChild(maxIndicator)
    this.root.appendChild(maxContainer)
    this.root.classList.add('range-filter')

    this.root.appendChild(this.removeButton)

    // Initialize indicator values
    updateMinIndicator.apply(self)
    updateMaxIndicator.apply(self)
}

RangeFilter.prototype = {
    getRoot: function() {
        return this.root
    },
    reset: function() {
        this.minSlider.value = this.minSlider.getAttribute('min')
        this.maxSlider.value = this.maxSlider.getAttribute('max')
    },
    getPredicate: function() {
        // If both sliders are at their most accepting values, accept anything
        if (this.minSlider.value == this.minSlider.getAttribute('min')
        && this.maxSlider.value == this.maxSlider.getAttribute('max')) {
            return new All()
        } else {
            // Otherwise limit to the range and exclude NaN values
            var min = this.minSlider.value
            var max = this.maxSlider.value
            return new Range(this.property, min, max)
        }
    },
    setOnRemovePressed: FilterControl.prototype.setOnRemovePressed,
}

/**
* A filter that displays several check boxes
*
* When no check boxes are selected, the filter accepts anything. When one
* or more check boxes are selected, the filter accepts objects with values
* of the specified property that match any of the checked boxes.
*
* @param property the name of the property to filter on
* @param values an array of values to allow the user to select
* @param label a label to display
*/
function CheckBoxFilter(property, values, label) {
    FilterControl.call(this, property)

    this.root = document.createElement('div')
    this.root.classList.add('checkbox-filter')
    this.root.appendChild(new Text(label))
    this.boxes = []
    for (var i = 0; i < values.length; i++) {
        var linkId = 'CheckBoxFilter-' + property + '-' + values[i];
        var input = document.createElement('input')
        input.setAttribute('id', linkId)
        input.setAttribute('type', 'checkbox')
        input.setAttribute('data-value', values[i])
        this.boxes.push(input)

        var label = document.createElement('label')
        label.setAttribute('for', linkId)
        label.textContent = values[i]

        var container = document.createElement('div')
        container.appendChild(input)
        container.appendChild(label)
        this.root.appendChild(container)
    }
    this.root.appendChild(this.removeButton)
}
CheckBoxFilter.prototype = {
    getRoot: function() {
        return this.root
    },
    reset: function() {
        for (var i = 0; i < this.boxes.length; i++) {
            this.boxes[i].checked = false
        }
    },
    getPredicate: function() {
        var predicates = []
        for (var i = 0; i < this.boxes.length; i++) {
            var box = this.boxes[i]
            var checked = box.checked
            var value = box.getAttribute('data-value')
            if (checked) {
                predicates.push(new FieldMatches(this.property, value))
            }
        }
        if (predicates.length > 0) {
            // Call new Or() with predicates as the arguments
            return new (Function.prototype.bind.apply(Or, [null].concat(predicates)))
        } else {
            return new All()
        }
    },
    setOnRemovePressed: FilterControl.prototype.setOnRemovePressed,
}
