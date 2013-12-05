// Karma configuration
// Generated on Wed Aug 07 2013 12:10:29 GMT+0200 (CEST)

module.exports = function (config) {
    config.set({

        // frameworks to use
        frameworks: ['jasmine', 'requirejs'],


        // list of files / patterns to load in the browser
        files: [
            {pattern: 'app/conf/deps.json', included: false},
            {pattern: 'app/bower_components/**/*.js', included: false},
            {pattern: 'app/scripts/**/*.js', included: false},
            {pattern: 'app/templates/**/*.html', included: false},
            {pattern: 'test/unit/*.js', included: false},

            {pattern: 'target/require.partial.conf.js'},
            {pattern: 'test/require.conf.js'}
        ],


        // list of files to exclude
        exclude: [
            '**/*.swp'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'junit'],

        junitReporter: {
            outputFile: 'target/jstests/karma-results.xml'
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        preprocessors: {
            '**/*.html': []
        }
    });
};

// Karma configuration
// Generated on Wed Aug 07 2013 12:10:29 GMT+0200 (CEST)

module.exports = function (config) {
    'use strict';
    config.set({

        // frameworks to use
        frameworks: ['jasmine', 'requirejs'],


        // list of files / patterns to load in the browser
        files: [
            {pattern: 'app/conf/deps.json', included: false},
            {pattern: 'app/bower_components/**/*.js', included: false},
            {pattern: 'app/scripts/**/*.js', included: false},
            {pattern: 'app/templates/**/*.html', included: false},
            {pattern: 'test/unit/*.js', included: false},

            {pattern: 'target/require.partial.conf.js'},
            {pattern: 'test/require.conf.js'}
        ],


        // list of files to exclude
        exclude: [
            '**/*.swp'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'junit'],

        junitReporter: {
            outputFile: 'target/surefire-reports/karma-results.xml'
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        preprocessors: {
            '**/*.html': []
        }
    });
};

