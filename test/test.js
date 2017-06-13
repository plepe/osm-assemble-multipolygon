var assembleMultipolygon = require('../src/assemble-multipolygon')

var assert = require('assert')
var fs = require('fs')

describe('results', function () {
  for (var i = 1; i <= 3; i++) {
    it('example ' + i, function (i) {
      var input = JSON.parse(fs.readFileSync('test/data/' + i + '.json', { encoding: 'utf-8' }))
      var expected = JSON.parse(fs.readFileSync('test/data/' + i + '.geojson', { encoding: 'utf-8' }))
      var actual = assembleMultipolygon(input)

      assert.deepEqual(actual, expected, 'error in conversion')
    }.bind(this, i))
  }
})
