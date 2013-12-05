define(['loglevel', 'underscore', 'moment'], function (log, _, moment) {
    'use strict';

    // Retrieve
    var queryParam = function (param, defaultValue) {
        var name = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]'),
                regexS = '[\\?&]' + name + '=([^&#]*)',
                regex = new RegExp(regexS),
                results = regex.exec(window.location.search);
        if (results === null) {
            return defaultValue;
        } else {
            return decodeURIComponent(results[1].replace(/\+/g, ' '));
        }
    };

    // Change level dynamically
    try {
        log.setLevel(window.location.href.indexOf('locahost') !== 1 ? queryParam('loglevel', 'debug') : 'error');
    } catch (e) {
        // No console object available
    }

    // Wrap all methods to prepend time
    var momentLogWrapper = function (func) {
        if (arguments.length !== 3) { // First on is 'func'
            throw 'Log must have 2 arguments: filename and message';
        }
        return func(moment().format('H:mm:ss.SSS ') + arguments[1] + ' => ' + arguments[2]);
    };
    log.trace = _.wrap(log.trace, momentLogWrapper);
    log.debug = _.wrap(log.debug, momentLogWrapper);
    log.info = _.wrap(log.info, momentLogWrapper);
    log.warn = _.wrap(log.warn, momentLogWrapper);
    log.error = _.wrap(log.error, momentLogWrapper);

    return log;
});