define(['marionette', 'log', 'codacy-poc-routes-controller'],
    function (Marionette, log, RoutesController) {
        'use strict';
        return Marionette.AppRouter.extend({
            initialize: function () {
                log.debug('Router', 'initialize');
            },
            controller: new RoutesController(),
            appRoutes: {
                '*path': 'defaultRoute'
            }
        });
    }
);