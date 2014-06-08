'use strict';

// User routes use category controller
var category = require('../controllers/category');

module.exports = function(app, passport) {
 
    // app.route('/category/list')
    //     .get(category.me);

    // Setting up the category api
    app.route('/category/create')
        .get(category.render);
    app.route('/category/create').post(category.create);

    app.route('/category/list').get(category.list);


};