require('./helper');
var sequences = rootRequire('lib/sequences');

describe("sequences", function(){

    var fetch;
    beforeEach(function(){
        fetch = sinon.stub(sequences, 'fetch');
    });
    afterEach(function(){
        sequences.fetch.restore();
    });

    describe("get", function(){
        it("retrieves preset sequences by name", function(done){
            sequences.get('doom', function(err, seq){
                seq.should.be.ok;
                done();
            });
        });
        it("otherwise delegates to fetch", function(done){
            sequences.get(1, function(){});
            fetch.callCount.should.equal(1);
            done();
        });
    });

});
