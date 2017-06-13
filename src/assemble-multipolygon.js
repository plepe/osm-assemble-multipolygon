function toPoints (input) {
  return input.map(function (x) {
    return [ x.lon, x.lat ]
  })
}

function assembleMultipolygon (input) {
  var i
  var ret = {
    type: "Feature",
    properties: {
      "@id": input.type + '/' + input.id
    },
    geometry: {
      "type": "Polygon",
      "coordinates": []
    }
  }

  for (var k in input.tags) {
    ret.properties[k] = input.tags[k]
  }

  var outer_closed = []
  var outer_parts = []
  var inner_closed = []
  var inner_parts = []

  for (i = 0; i < input.members.length; i++) {
    var member = input.members[i]

    if (member.type === 'way') {
      var gl = member.geometry.length - 1 // last point of the way
      var memberIsClosed =
        member.geometry[0].lat == member.geometry[gl].lat &&
        member.geometry[0].lon == member.geometry[gl].lon

      if (member.role === 'outer' && memberIsClosed) {
        outer_closed.push(member.geometry)
      }
    }
  }

  if (outer_closed.length === 1) {
    ret.geometry.coordinates.push(toPoints(outer_closed[0]))
  } else {
    ret.geometry.coordinates.push(outer_closed.map(function (x) {
      return toPoints(x)
    }))
  }

  return ret
}

module.exports = assembleMultipolygon
