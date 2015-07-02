module.exports = function(channel){
    return {
        id: parseInt(channel.match(/\d+$/)[0], 10)
    }
};
