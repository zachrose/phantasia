var _ = require('underscore');

var crazyColor = function(pos){
    return {
        "bri": 254,
        "sat": 254,
        "hue": 20000*pos,
        "transitiontime": 2
    }
};
module.exports = function(duration, tempo){
    duration = duration || 3000;
    tempo = tempo || 1000;
    var events = Math.floor(duration/tempo);
    var lightCount = 3;
    var range = _.range(events);
    var sequence = _(range).chain().map(function(n){
        var time = n*tempo;
        return _.range(1, lightCount+1).map(function(channel){
            var pos = ((n+channel)%lightCount)/lightCount;
            return {
                time: time,
                data: crazyColor(pos),
                channel: channel.toString()
            };
        });
    }).flatten().value();
    return sequence;
};
