'use strict';

var express = require('express');
var app = express();

var port = process.env.PORT;
app.get('/', function(res,req){
    res.end('Hello World');
});

var server = app.listen(port, function () {
  var host = process.env.IP;
  

  console.log('Example app listening at http://%s:%s', host, port);
});