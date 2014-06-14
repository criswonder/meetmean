'use strict';

angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['mean']);

});

// Dynamically add angular modules declared by packages
var packageModules = [];
// 这里的window.modules获取的是服务端server/controllers/index.js通过res.render('index', ..）init在window里面的对象
// 可以看到这次提交，注释了index.js里面相关代码过后的效果
//
//modules in init.js:ngCookies,ngResource,ui.bootstrap,ui.router,mean.system,mean.auth 
for (var index in window.modules) {
    angular.module(window.modules[index].module, window.modules[index].angularDependencies || []);
    packageModules.push(window.modules[index].module);
}

// Default modules
var modules = ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'mean.system', 'mean.auth'];
modules = modules.concat(packageModules);
console.log('modules in init.js:'+modules);
// Combined modules
angular.module('mean', modules);
