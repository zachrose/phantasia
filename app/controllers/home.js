var sequences = rootRequire('lib/sequences');

var homeController = {
    index: function(req, res, next){
        res.render('home.jade');
    }
};

module.exports = homeController;
