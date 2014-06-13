# buffered-xhr-stream

A node stream that wraps xhr GET requests as a stream. 

Created because the browserify node http module emits all the data as it's received, and it cannot be paused. This can cause the browser to peg the cpu if it's a large request. This module allows you to pause the stream, so it stops emitting data events. XHR responseText is buffered anyway, so when this stream is resumed, it starts emitting buffered data stored in responseText.

## USAGE

```javascript
var XHRStream = require('buffered-xhr-stream')
  , xhr = new XMLHttpRequest

xhr.open('GET', '/some-large-docs.json', true)

var stream = new XHRStream(xhr)
  , count = 0

stream.on('data', function (d) {
  if (++count % 10 === 0) {
    stream.pause()
  }
  console.log(d)
})

```

You can specify an optional chunk size.
```javascript
var XHRStream = require('buffered-xhr-stream')
  , xhr = new XMLHttpRequest

xhr.open('GET', '/some-large-docs.json', true)

var stream = new XHRStream(xhr, {chunkSize: 2048})
```
