require('./helper');
var flow = rootRequire('lib/flow');
var add = function(n){
    return function(value, next){
        next(null, value+n);
    };
};

describe('flow', function(){
    it('runs an async process on a value', function(done){
        flow(1, [add(2), add(3)], function(err, res){
            assert(err === null);
            res.should.equal(6);
            done();
        });
    });
});
