
QUnit.test('All', function(assert) {
    var all = new All()
    assert.ok(all.matches(null), 'match null')
    assert.ok(all.matches(undefined), 'match undefined')
    assert.ok(all.matches(1), 'match integer')
    assert.ok(all.matches([]), 'match empty list')
    assert.ok(all.matches({}), 'match empty object')
    assert.ok(all.matches({lasagna: 'delicious'}), 'match non-empty object')
})

QUnit.test('IsObject', function(assert) {
    var pred = new IsObject()
    assert.notOk(pred.matches(null), 'match null')
    assert.notOk(pred.matches(undefined), 'match undefined')
    assert.notOk(pred.matches(32), 'match integer')
    assert.ok(pred.matches([]), 'match empty list')
    assert.ok(pred.matches({}), 'match emtpy object')
    assert.ok(pred.matches({lasagna: 'delicious'}), 'match non-empty object')
})

QUnit.test('HasField', function(assert) {
    var pred = new HasField('durian')
    assert.notOk(pred.matches(null), 'match null')
    assert.notOk(pred.matches(undefined), 'match undefined')
    assert.notOk(pred.matches(32), 'match integer')
    assert.notOk(pred.matches([]), 'match empty list')
    assert.notOk(pred.matches({}), 'match emtpy object')
    assert.notOk(pred.matches({lasagna: 'delicious'}),
        'match non-empty object without matching field')
    assert.ok(pred.matches({durian: 3}), 'match with matching field')
})

QUnit.test('FieldMatches', function(assert) {
    var pred = new FieldMatches('durian', 'palatine')
    assert.notOk(pred.matches(null), 'match null')
    assert.notOk(pred.matches(undefined), 'match undefined')
    assert.notOk(pred.matches(32), 'match integer')
    assert.notOk(pred.matches([]), 'match empty list')
    assert.notOk(pred.matches({}), 'match emtpy object')
    assert.notOk(pred.matches({lasagna: 'delicious'}),
        'match non-empty object without matching field')
    assert.notOk(pred.matches({durian: 3}),
        'match with matching field, incorrect value')
    assert.notOk(pred.matches({durian: 'capitoline'}),
        'match with matching field, another incorrect value')
    assert.ok(pred.matches({durian: 'palatine'}),
        'match with matching field, matching value')
})

QUnit.test('Range', function(assert) {
    var pred = new Range('rigatoni', 0, 10)
    assert.notOk(pred.matches(null), 'match null')
    assert.notOk(pred.matches(undefined), 'match undefined')
    assert.notOk(pred.matches(32), 'match integer')
    assert.notOk(pred.matches([]), 'match empty list')
    assert.notOk(pred.matches({}), 'match emtpy object')
    assert.notOk(pred.matches({lasagna: 'delicious'}),
        'match non-empty object without matching field')

    assert.notOk(pred.matches({rigatoni: -1}), 'match out of range low')
    assert.notOk(pred.matches({rigatoni: 11}), 'match out of range high')
    assert.notOk(pred.matches({rigatoni: 0}), 'match in range')
})
