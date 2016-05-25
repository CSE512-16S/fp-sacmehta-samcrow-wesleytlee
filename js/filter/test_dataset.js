
QUnit.test('DataSet create and access', function(assert) {
    var data = [1, 2, 3, 84]
    var dataSet = new DataSet(data);
    assert.deepEqual(dataSet.rows, data, 'data matches')
})

QUnit.test('DataSet filter all', function(assert) {
    var data = [1, 2, 3, 84]
    var dataSet = new DataSet(data);
    var subset = dataSet.filter(new All())
    assert.deepEqual(subset.rows, data, 'data matches')
})

QUnit.test('DataSet filter objects, no objects', function(assert) {
    var data = [1, 2, 3, 84]
    var dataSet = new DataSet(data);
    var subset = dataSet.filter(new IsObject())
    assert.deepEqual(subset.rows, [], 'data matches')
})
QUnit.test('DataSet filter objects, one object', function(assert) {
    var data = [1, 2, 3, 84, {spaghetti: 'carbonara'}]
    var dataSet = new DataSet(data);
    var subset = dataSet.filter(new IsObject())
    assert.deepEqual(subset.rows, [{spaghetti: 'carbonara'}], 'data matches')
})
QUnit.test('DataSet filter field matches, multiple objects', function(assert) {
    var data = [1, 2, 3, 84, {spaghetti: 'carbonara'}, {spaghetti: 'alfredo'}]
    var dataSet = new DataSet(data);
    var subset = dataSet.filter(new FieldMatches('spaghetti', 'carbonara'))
    assert.deepEqual(subset.rows, [{spaghetti: 'carbonara'}], 'data matches')
})
