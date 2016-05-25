window.onload = function() {

    var data = new DataSet([{
        id: 1,
        durian: false,
        tetration: 'papaya'
    }, {
        id: 2,
        durian: false,
        tetration: 'papaya'
    }, {
        id: 3,
        durian: true,
        tetration: 'papaya'
    }, {
        id: 4,
        durian: true,
        tetration: 'mango'
    }, {
        id: 5,
        durian: false,
        tetration: 'papaya'
    }, {
        id: 6,
        durian: false,
        tetration: 'mango'
    }, {
        id: 7,
        durian: true,
        tetration: 'papaya'
    }, {
        id: 8,
        durian: true,
        tetration: 'kumquat'
    }, {
        id: 9,
        durian: false,
        tetration: 'papaya'
    }, {
        id: 10,
        durian: false,
        tetration: 'papaya'
    }, {
        id: 11,
        durian: false,
        tetration: 'papaya'
    }, {
        id: 12,
        durian: false,
        tetration: 'papaya'
    }, {
        id: 13,
        durian: true,
        tetration: 'papaya'
    }, {
        id: 14,
        durian: false,
        tetration: 'papaya'
    }, ])

    var filter = new BooleanFilter('durian', 'Durian')
    var container = document.getElementById('filter-container')
    container.appendChild(filter.getRoot())

    var stringFilter = new StringFilter('tetration', ['papaya', 'mango', 'kumquat'], 'Tetration')
    container.appendChild(stringFilter.getRoot())

    var update = function() {
        var predicate = new And(filter.getPredicate(), stringFilter.getPredicate())
        var subset = data.filter(predicate)
        console.log(filter.getPredicate())
        console.log(subset)
    }

    filter.setOnChange(update)
    stringFilter.setOnChange(update)
    update()
}
