var tests = [],
    karmaGlobal = window.__karma__;
for (var file in karmaGlobal.files) {
    if (karmaGlobal.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

var requireConf = window.requirescriptconf;

requireConf.baseUrl = '/base/app';
requireConf.deps = tests;
requireConf.callback = karmaGlobal.start;

requireConf.paths['jasmine-jquery'] = 'bower_components/jasmine-jquery/jasmine-jquery';
requireConf.shim['jasmine-jquery'] = { deps: ['jquery'], exports: '$' };

requirejs.config(requireConf);

require(['log', 'underscore', 'marionette'], function (log, _, Marionette) {
    'use strict';
    log.info('require.conf.js', 'Apply modified marionette rendering specified in App.js file (to maintain...)');
    Marionette.Renderer.render = function (template, data) {
        if (_.isFunction(template)) {
            return template(data);
        } else if (_.isString(template)) {
            return template;
        } else {
            return template + '';
        }
    };
    log.disableAll();
});
