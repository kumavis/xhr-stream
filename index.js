var ReadableStream = require('stream').Readable
var inherits = require('util').inherits

module.exports = XhrStream


inherits(XhrStream, ReadableStream)

function XhrStream(opts) {
  opts = opts || {}

  // created via url
  if (typeof opts === 'string') {
    var url = opts
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    opts = { xhr: xhr }
  }

  // created via xhr
  if (opts instanceof XMLHttpRequest) {
    var xhr = opts
    opts = { xhr: xhr }
  }

  if (!opts.xhr) {
    throw new Error('XhrStream - must provide XHR or URL')
  }

  ReadableStream.call(this, opts)
  this.offset = 0
  this.capable = true

  this.xhr = opts.xhr
  this.xhr.onreadystatechange = this._stateChanged.bind(this)
  this.xhr.send(null)
}

// the xhr data is fetched eagerly, so the `_read` hint is not meaningful
XhrStream.prototype._read = noop

XhrStream.prototype._stateChanged = function () {
  if (this.capable && this.xhr.readyState === 3) {
    try {
      this._flushResponseText()
    } catch (e) {
      this.capable = false
      this.emit('error', new Error('Not capable of reading from XHR.'))
    }
  } else if (this.xhr.readyState === 4) {
    if (this.xhr.error) {
      this.emit('error', this.xhr.error)
    } else {
      this._flushResponseText(this)
      this.push(null)
    }
  }
}

XhrStream.prototype._flushResponseText = function () {
  var responseText = this.xhr.responseText
  if (!responseText) return
  while (responseText.length > this.offset) {
    var chunk = responseText.substr(this.offset)
    this.offset += chunk.length
    this.push(chunk)
  }
}

function noop () {}