define(['backbone', 'marionette', 'underscore', 'log', 'codacy-poc-router', 'codacy-poc-main-view'],
    function (Backbone, Marionette, _, log, Router, MainView) {
        'use strict';
        return Marionette.Application.extend({
            onInitializeAfter: function () {
                log.debug('App', 'initialize:after');

                Marionette.Renderer.render = function (template, data) {
                    if (_.isFunction(template)) {
                        return template(data);
                    } else if (_.isString(template)) {
                        return template;
                    } else {
                        return template + '';
                    }
                };

                this.addRegions({
                    mainRegion: 'body'
                });
            },
            onStart: function () {
                log.debug('App', 'app:start');

                this.mainRegion.show(new MainView());

                new Router();
                Backbone.history.start({pushState: false});
            }
        });
    }
);