var http = require('http');
var multiparty = require('multiparty');

var consumer = require('./lib/consumer.js');

var server = http.createServer(function (req, res) {
  'use strict';
  
  if (req.method === 'POST' && req.url === '/soundshare/sound') {
    console.log('Post Request');
    consumer.addFile(req);
    res.end();
  }
  else if (req.method === 'GET' && req.url === '/soundshare/sounds') {
    console.log('Get Request');
    consumer.getFiles()
    .then(function (files) {
      console.log(files);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(files));
    });
  }
  
});

server.listen(8080, '0.0.0.0');