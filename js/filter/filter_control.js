
/*
 * Filter controls
 *
 * Each filter control has a root DOM element and a predicate.
 */

/**
 * Creates a boolean filter to filter on a property
 * @param property the property to find
 * @param label the label to display
 */
function BooleanFilter(property, label) {
    this.property = property

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
    this.root = div
    this.select = select
}

BooleanFilter.prototype.getRoot = function() {
    return this.root
}

BooleanFilter.prototype.getPredicate = function() {
    var selection = this.select.value
    if (selection == 'true') {
        return new FieldMatches(this.property, true)
    } else if (selection == 'false') {
        return new FieldMatches(this.property, false)
    } else {
        return new All()
    }
}

/**
 * A filter that matches a string property with a predefined value
 * @param property the property name to check
 * @param values an array of values of the property to match
 * @param label a label to display
 */
function StringFilter(property, values, label) {
    this.property = property

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

    this.root = root
}
StringFilter.prototype.getRoot = function() {
    return this.root
}

StringFilter.prototype.getPredicate = function() {
    var selection = this.select.value
    if (selection == '__any__') {
        return new All()
    } else {
        return new FieldMatches(this.property, selection)
    }
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
    this.property = property

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

    // Initialize indicator values
    updateMinIndicator.apply(self)
    updateMaxIndicator.apply(self)
}

RangeFilter.prototype.getRoot = function() {
    return this.root
}

RangeFilter.prototype.getPredicate = function() {
    var min = this.minSlider.value
    var max = this.maxSlider.value
    return new Range(this.property, min, max)
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
    this.property = property
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
}

CheckBoxFilter.prototype.getRoot = function() {
    return this.root
}

CheckBoxFilter.prototype.getPredicate = function() {
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
}
