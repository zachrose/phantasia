var db = rootRequire('data').sequences;
var presets = {
    'doom': require('./cycle')(10000, 333)
};

module.exports = {
    get: function(identifier, cb){
        var sequence;
        if(sequence = presets[identifier]){
            return process.nextTick(function(){
                cb(null, sequence);
            });
        }else{
            this.fetch.apply(this, arguments);
        }
    },
    fetch: function(id, cb){
        db.findOne({_id: id}, function(err, doc){
            if(err) return cb(err);
            cb(null, doc.sequence);
        });
    }
};

