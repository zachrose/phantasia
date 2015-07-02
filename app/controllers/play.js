var Player = require('barrel').player;
var doer = rootRequire('lib/doer');
var log = rootRequire('lib/log');
var sequences = rootRequire('lib/sequences');

var playController = {
    create: function(req, res, next){
        var identifier = req.body.sequence;
        sequences.get(identifier, function(err, sequence){
            if(err){
                return res.status(500).send("Error");
            }
            if(sequence){
                var player = new Player(doer).load(sequence).play();
                res.status(200).send("ok");
                log.info("Playing sequence "+identifier);
            }else{
                var errors = [
                    "No sequence specified",
                    "Sequence "+sequenceId+" could not be found"
                ];
                var message = sequenceId ? errors[1] : errors[0];
                return res.status(400).send(message);
            }
        });
    }
};

module.exports = playController;
