module.exports = function(app, path, controller){
    console.log('path', path);
    app['get'](path, controller.index);
    app['get'](path+'/:id', controller.find);
    app['post'](path, controller.create);
    app['put'](path+'/:id', controller.update);
    app['delete'](path+'/:id', controller.destroy);
};
