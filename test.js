var test = require('tape')
  , Stream = require('./index.js')

global.window.XMLHttpRequest = function() {
  this.open = function () {}
  this.send = function() {}
}

test('required options', function (t) {
  t.throws(function () {
    new Stream
  })
  t.end()
})

test('url or xhr required', function (t) {
  t.throws(function () {
    new Stream({})
  })
  t.doesNotThrow(function () {
    new Stream({url: '/foo'})
  })
  t.doesNotThrow(function () {
    new Stream({xhr: new XMLHttpRequest})
  })
  t.end()
})
