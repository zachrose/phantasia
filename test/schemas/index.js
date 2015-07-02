#!/usr/bin/env node

var fs = require('fs');
var validate = require('jsonschema').validate;
var rootRequire = function(path){
    return require(__dirname+'/../../'+path);
};
var exitStatus = 0;
var examples = fs.readdirSync(__dirname)
    .filter(function(filename){
        return !filename.match(/^index/);
    })
    .filter(function(filename){
        return filename.match(/\.json$/);
    })
    .map(function(filename){
        return filename.split('.')[0];
    })
    .filter(function(filename){
        return filename.match(/valid/);
    })
    .map(function(filename){
        var name = filename.split('-').slice(0,-1).join();
        var example = require('./'+filename);
        var schema = rootRequire('data/schemas/'+name);
        return {
            name: name,
            validation: validate(example, schema)
        }
    })
    .forEach(function(results){
        var name = results.name;
        var validation = results.validation;
        var ok = !validation.errors.length;
        process.stderr.write(name+(ok ? " OK": " NOT OK")+'\n');
        if(!ok){
            exitStatus++;
            validation.errors.forEach(function(e){
                process.stderr.write(e+'\n');
            });
        }
    });

process.exit(exitStatus);


