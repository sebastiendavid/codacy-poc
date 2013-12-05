define(['backbone', 'marionette', 'handlebars', 'log', 'text!templates/main.html'],
    function (Backbone, Marionette, Handlebars, log, html) {
        'use strict';
        return Marionette.ItemView.extend({
            initialize: function () {
                log.debug('MainView', 'initialize');
            },
            model: new Backbone.Model({
                title: 'Hello!'
            }),
            template: Handlebars.compile(html)
        });
    }
);