global.rootRequire = function(path){
    return require(__dirname+'/../'+path);
};

var express = require('express');
var log = rootRequire('lib/log');
var controllers = rootRequire('app/controllers');
var crudify = rootRequire('lib/crudify');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname+'/../static'));
app.engine('jade', require('jade').__express);
app.set('views', __dirname+'/views');
app.use(log.express);
app.use(bodyParser.json());

crudify(app, '/sequences', controllers.sequence);
app.post('/play', controllers.play.create);
app.get('/', controllers.home.index);

module.exports = app;
