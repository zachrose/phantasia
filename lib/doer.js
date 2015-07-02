var HueApi = require("node-hue-api").HueApi;
var config = require('config');
var channelMapper = require('./channel_mapper');
var log = require('./log');
var host = config.bridge.host;
var username = config.bridge.username;
var api = new HueApi(host, username);

/*
var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

api.lights()
    .then(displayResult)
    .done();
*/

var doer = function(data, channel){
    var light = channelMapper(channel);
    api.setLightState( light.id, data )
        .then(logSuccess)
        .fail(logFailure)
        .done();
};

var logSuccess = function(){
    log.debug(arguments);
}

var logFailure = function(error){
    log.error("setting light state ", error.code);
}

module.exports = doer;
