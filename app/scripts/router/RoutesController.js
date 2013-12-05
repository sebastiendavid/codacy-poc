define(['backbone', 'marionette', 'log', 'codacy-poc-content-region'],
    function (Backbone, Marionette, log, ContentRegion) {
        'use strict';
        return Marionette.Controller.extend({
            region: new ContentRegion(),
            defaultRoute: function () {
                log.debug('RoutesController', 'go to default route');
                /*
                this.navigate('some-path');

                or

                this.region.show(new SomeView());
                */
            },
            navigate: function (hash) {
                Backbone.history.navigate(hash, {trigger: true, replace: false});
            }
        });
    }
);