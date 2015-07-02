var _ = require('underscore');

module.exports = function(duration, tempo){
    duration = duration || 3000;
    tempo = tempo || 1000;
    var events = Math.floor(duration/tempo);
    var lightCount = 3;
    var range = _.range(events);

    var events = range.map(function(i){
        return {
            time: i*tempo,
            data: {
                sat: 254,
                bri: 100,
                hue: 30000
            }
        }
    });
    var sequence = _(range).chain().map(function(n){
        var time = n*tempo;
        return _.range(1, lightCount+1).map(function(channel){
            var pos = ((n+channel)%lightCount)/lightCount;
        });
    }).flatten().value();
    return sequence;
};
