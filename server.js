var _ = require('lodash');
var http = require('http');
var through = require('through');

var level = require('level');
var db = level('./mydb');

var server = http.createServer(function (req, res) {
  'use strict';
  console.log('request bro');
  
  if (req.method === 'POST') {
    req.pipe(through(function (buf) {
      console.log(buf);
    })).pipe(res);
  }
  
/*  var ans = {
    pk: 1,
    model: 'soundshare.sound',
    fields: {
      name: 'asd',
      udid: '19854B06-32C1-4607-88B8-2AFDD0D59393',
      long: -122.4064,
      likes: 0,
      lat: 37.78584,
      path: 'turn.wav',
      pub_date: '2014-02-14T02:46:25.484Z',
      description: 'asd'
    }
  };
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify([ans]));*/
});

server.listen(8080, '0.0.0.0');