
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

BooleanFilter.prototype.setOnChange = function(callback) {
    this.select.onchange = function(){ callback() }
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
    root.appendChild(labelElement)
    root.appendChild(this.select)

    this.root = root
}
StringFilter.prototype.getRoot = function() {
    return this.root
}

StringFilter.prototype.setOnChange = function(callback) {
    this.select.onchange = function(){ callback() }
}

StringFilter.prototype.getPredicate = function() {
    var selection = this.select.value
    if (selection == '__any__') {
        return new All()
    } else {
        return new FieldMatches(this.property, selection)
    }
}
