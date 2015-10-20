'use strict';

// User routes use category controller
var category = require('../controllers/category_ctrl');
var items_ctrl = require('../controllers/items_ctrl');
var feedback_ctrl = require('../controllers/feedback_ctrl');

module.exports = function(app, passport) {
 
    // app.route('/category/list')
    //     .get(category.me);

    // Setting up the category api
    app.route('/category/create')
        .get(category.render);
    app.route('/category/create').post(category.create);

    app.route('/category/list').get(category.list);
    app.route('/category/list').post(category.create_ablum_item);

    //curl -H "Content-Type: application/json" -d '{"IMEI":"xyz","MAC":"xyz","SERIAL":"ABDDD","SubscriberId":"xxxx"}' http://192.168.0.105:3000/device/list
    app.route('/device/list').post(category.create_device);
    app.route('/device/list').get(category.list_device);

    app.route('/albums').get(items_ctrl.list);
    app.route('/albums/remove').get(category.remove_ablum);
    app.route('/albums/:ablumId').get(items_ctrl.get);

    //app调用的接口
    app.route('/albums.json').get(items_ctrl.list);
    app.route('/favs').get(items_ctrl.getfavs);//传入uid
    app.route('/albums_query').get(items_ctrl.getAlbums);
    app.route('/albums/fav').post(items_ctrl.fav);
    app.route('/full.json').get(items_ctrl.fulljson);
    app.route('/download').get(items_ctrl.download);
    app.route('/download.apk').get(items_ctrl.download_apk);

    app.route('/feedback').post(feedback_ctrl.create);
};