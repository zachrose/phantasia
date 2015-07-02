var snl = require('simple-node-logger')
var morgan = require('morgan');
var moment = require('moment');
var now = function(){
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
};

var log = snl.createSimpleLogger({
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
});

morgan.token('now', now);
log.express = morgan(':now HTTP  :method :url :status - :response-time ms');

module.exports = log;


