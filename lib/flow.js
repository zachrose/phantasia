var async = require('async');

module.exports = function(start, steps, end){
    var embark = function(next){
        next(null, start);
    };
    steps.unshift(embark);
    async.waterfall(steps, end);
};

