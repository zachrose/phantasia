require('./helper');
var channelMapper = rootRequire('lib/channel_mapper');

describe("channelMapper", function(){
    it("returns a light id for a sequence channel", function(){
        var expected = { id: 1 };
        channelMapper('light1').should.eql(expected);
    });
});
