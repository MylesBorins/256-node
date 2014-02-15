var path = require('path');
var util = require('util');
var _ = require('lodash');

var q = require('q');

var level = require('level');
var db = level('./mydb', {valueEncoding : 'json'});

var multiparty = require('multiparty');

var addFile = function (req) {
  'use strict';
  var form = new multiparty.Form();
  
  form.parse(req, function (err, fields, files) {
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
      */
    var soundFile = {
      name: fields.name[0],
      udid: fields.udid[0],
      long: fields.long[0],
      lat: fields.lat[0],
      likes: 0,
      path: files.soundfile[0].originalFilename,
      pub_date: new Date().toISOString(),
      description: fields.description[0]
    };

    db.put(soundFile.name, soundFile, function (err) {
      if (err) {
        return console.log('Ooops!', err);
      }
    });
  });
};

exports.addFile = addFile;

var getFiles = function () {
  'use strict';
  var deferred = q.defer();
  var files = [];
  db.createReadStream().on('data', function (data) {
    files.push(data.value);
  })
  .on('end', function () {
    deferred.resolve(files);
  });
  return deferred.promise;
};

exports.getFiles = getFiles;