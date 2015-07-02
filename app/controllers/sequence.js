var db = rootRequire('data').sequences;
var log = rootRequire('lib/log');

var ourFault = function(err){
    log.error("nedb: ", err.message);
    return "Something went wrong on our end";
};
var query = function(req){
    return {_id: req.params.id };
};

var create = function(req, res, next){
    db.insert(req.body, function(err, doc){
        if(err) return res.status(500).send(ourFault(err));
        res.status(201).send(doc);
    });
};
var index = function(req, res, next){
    db.find({}, function(err, docs){
        if(err) return res.status(500).send(ourFault(err));
        res.status(200).send(docs);
    });
};
var find = function(req, res, next){
    var q = query(req);
    db.findOne(q, function(err, doc){
        if(err) return res.status(500).send(ourFault(err));
        if(!doc) return res.status(404).end();
        res.status(200).send(doc);
    });
};
var update = function(req, res, next){
    var q = query(req);
    db.update(q, req.body, function(err, affected, newDoc){
        if(err) return res.status(500).send(ourFault(err));
        if(!affected) return res.status(404).end();
        res.status(200).send(newDoc);
    });
};
var destroy = function(req, res, next){
    var q = query(req);
    db.remove(q, function(err, affected){
        if(err) return res.status(500).send(ourFault(err));
        if(!affected) return res.status(404).end();
        res.status(200).end();
    });
};

module.exports = {
    create: create,
    index: index,
    find: find,
    update: update,
    destroy: destroy
}
