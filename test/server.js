var http = require('http')

var server = http.createServer(function (req, res) {
  res.end('foos and bars')
}).listen(parseInt(process.env.PORT))
