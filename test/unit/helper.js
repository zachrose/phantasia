"use strict";

process.env.NODE_ENV = 'test';
global.rootRequire = function(path){
    return require(__dirname+'/../../'+path);
};
global.assert = require('assert');
global.sinon = require('sinon');
require('should');
