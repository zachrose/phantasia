var nedb = require('nedb');

db = {};
['sequences'].forEach(function(collection){
    db[collection] = new nedb(__dirname+'/'+collection);
    db[collection].loadDatabase();
});

module.exports = db;

