'use strict';

if (window.requireJsConf) {
    requirejs.config(window.requireJsConf);
}

require(['log'], function (log) {
    log.info('main', 'Starting app...');
    require(['codacy-poc-app'], function (App) {
        new App().start();
        log.info('main', 'App started!');
    });
});