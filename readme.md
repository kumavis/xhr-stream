# xhr-stream

A node stream that wraps xhr GET requests as a stream.

### usage

```js
var XhrStream = require('xhr-stream')

var xhr = new XMLHttpRequest()
xhr.open('GET', '/some-large-docs.json', true)
var stream = new XhrStream( xhr )

stream.pipe(somewhereAwesome)
```

### options

##### url

You can specify a url and an XHR will be created for you.
```js
var stream = new XhrStream( url )
```

### about

forked from [node-buffered-xhr-stream](https://github.com/SpiderStrategies/node-buffered-xhr-stream)