var Stream = require('./index')
  , JSONStream = require('JSONStream')
  , xhr = new XMLHttpRequest

xhr.open('GET', '/docs.json', true)

var count = 0
  , container = document.querySelector('#container')

var stream = window.stream = new Stream(xhr)

stream.pipe(JSONStream.parse(['rows', true])).on('data', function (d) {
  if (++count % 50 == 0) {
    stream.pause()
  }
  var node = document.createElement('div')
  node.appendChild(document.createTextNode(d.key))
  container.appendChild(node)
})
