#!/usr/bin/env node

var helper = require('../unit/helper');
process.env.NODE_ENV = '';
var config = require('config');
var superagent = require('superagent');
var async = require('async');
var cycle = rootRequire('lib/sequences/cycle')(10000, 200);
var host = 'http://localhost:'+config.port;
var sequenceId;

async.waterfall([
    // create
    function(next){
        superagent.post(host+'/sequences')
            .send({ sequence: cycle })
            .end(next);
    },
    // parse and save id
    function(res, next){
        sequenceId = res.body._id;
        process.nextTick(function(){
            next(null, sequenceId);
        });
    },
    // play by id
    function(id, next){
        superagent.post(host+'/play')
            .send({ sequence: sequenceId })
            .end(next);
    },
    // get by id
    function(res, next){
        superagent.get(host+'/sequences/'+sequenceId)
            .end(next);
    },
    // update
    function(res, next){
        var updated = res.body;
        updated.title = "Yay";
        superagent.put(host+'/sequences/'+sequenceId)
            .send(updated)
            .end(next);
    },
    // delete id
    function(res, next){
        superagent.del(host+'/sequences/'+sequenceId)
            .end(next);
    }
], function(err, res){
    if(err){
        process.stderr.write(err+'\n');
        process.exit(1);
    }
    process.exit(0);
});


