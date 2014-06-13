var http = require('http')
  , request = require('request')
  , ecstatic = require('ecstatic')({
    root: __dirname,
    cache: 0
  })

http.createServer(function (req, res) {
  if (req.url === '/docs.json') {
    request('http://isaacs.couchone.com/registry/_all_docs').pipe(res)
  } else {
    ecstatic(req, res)
  }
}).listen(3000)
