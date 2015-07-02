#!/usr/bin/env node

var app = require('./app');
var port = require('config').port;
var log = require('./lib/log');

app.listen(port, function(){
    log.info('phantasia running on port ', port);
});

