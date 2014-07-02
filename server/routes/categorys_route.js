'use strict';

// User routes use category controller
var category = require('../controllers/category_ctrl');
var items_ctrl = require('../controllers/items_ctrl');

module.exports = function(app, passport) {
 
    // app.route('/category/list')
    //     .get(category.me);

    // Setting up the category api
    app.route('/category/create')
        .get(category.render);
    app.route('/category/create').post(category.create);

    app.route('/category/list').get(category.list);
    app.route('/category/list').post(category.create_ablum_item);

    app.route('/albums').get(items_ctrl.list);
    app.route('/albums/fav').post(items_ctrl.fav);
    app.route('/albums/:ablumId').get(items_ctrl.get);

    //app调用的接口
    app.route('/albums.json').get(items_ctrl.list);
};