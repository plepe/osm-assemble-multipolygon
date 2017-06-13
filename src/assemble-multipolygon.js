function assembleMultipolygon (input) {
  var ret = {
    type: "Feature",
    properties: {
      "@id": input.type + '/' + input.id
    },
    geometry: {
      "type": "Polygon"
    }
  }

  for (var k in input.tags) {
    ret.properties[k] = input.tags[k]
  }

  return ret
}

module.exports = assembleMultipolygon
