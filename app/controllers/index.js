var fs = require('fs');

module.exports = fs.readdirSync(__dirname)
    .filter(function(file){
        return !file.match(/^index/);
    }).map(function(file){
        return file.split('.js')[0];
    }).reduce(function(memo, name){
        memo[name] = require('./'+name);
        return memo;
    }, {});
