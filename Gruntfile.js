var portscanner = require('portscanner');

module.exports = function (grunt) {
    'use strict';

    var requireJsonConf = function () {
        return grunt.file.readJSON('app/conf/deps.json');
    },

    requirejsConf = function () {
        var conf = requireJsonConf();
        conf.baseUrl = 'app';
        conf.name = 'codacy-poc-main';
        conf.include = ['require-lib'];
        conf.exculde = [];
        conf.stubModules = ['text'];
        conf.inlineText = true;
        conf.skipModuleInsertion = false;
        conf.optimizeCss = 'none';
        conf.optimize = 'uglify2';
        conf.preserveLicenseComments = false;
        conf.findNestedDependencies = true;
        /*
         conf.fileExclusionRegExp = /(^\.)|(^css$)|(^img$)|(^less$)|(^i18n$)/;
         conf.logLevel = 0;
         */
        return conf;
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        requirejs: {
            uglify: {
                options: (function () {
                    var opt = requirejsConf();
                    opt.out = 'target/js/<%= pkg.name %>-<%= pkg.version %>.min.js';
                    opt.uglify2 = {};
                    return opt;
                })()
            },
            beautify: {
                options: (function () {
                    var opt = requirejsConf();
                    opt.out = 'target/js/<%= pkg.name %>-<%= pkg.version %>.js';
                    //noinspection JSHint
                    opt.uglify2 = {
                        output: {
                            beautify: true
                        },
                        compress: {
                            sequences: false,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: true,
                        mangle: false
                    };
                    return opt;
                })()
            }
        },

        less: {
            uglify: {
                options: {
                    paths: ['app'],
                    yuicompress: true
                },
                files: {
                    'target/css/<%= pkg.name %>-<%= pkg.version %>.min.css': 'app/styles/main.less'
                }
            },
            beautify: {
                options: {
                    paths: ['app'],
                    compress: false,
                    yuicompress: false
                },
                files: {
                    'target/css/<%= pkg.name %>-<%= pkg.version %>.css': 'app/styles/main.less'
                }
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['target']
                }]
            }
        },

        jade: {
            compile: {
                options: {
                    data: {
                        env: 'production',
                        version: '<%= pkg.version %>',
                        min: '.min'
                    }
                },
                files: {
                    'target/index.html': ['app/templates/index.jade']
                }
            }
        },

        requirescriptconf: {
            generate: {
                conf: requireJsonConf(),
                filepath: 'target/require.partial.conf.js'
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true,
                autoWatch: false,
                basePath: '../'
            },
            watch: {
                configFile: 'test/karma.conf.js',
                autoWatch: true,
                basePath: '../'
            }
        },

        express: {
            dev: {
                options: {
                    args: [],
                    background: false,
                    script: 'start.js'
                }
            },
            prod: {
                options: {
                    args: ['prod'],
                    background: false,
                    script: 'start.js'
                }
            },
            casper: {
                options: {
                    args: ['prod', 'port=5555'],
                    background: true,
                    script: 'start.js'
                }
            }
        },

        nodemon: {
            dev: {
                options: {
                    file: 'start.js',
                    args: [],
                    nodeArgs: ['--debug'],
                    ignoredFiles: [
                        '/app/*',
                        '/test/*',
                        '/target/*',
                        '.git/*',
                        '.bowerrc',
                        '.editorconfig',
                        '.jshintrc',
                        'Gruntfile.js',
                        'package.json',
                        'pom.xml',
                        'README.md',
                        '*.iml'
                    ],
                    watchedFolders: ['.', 'api'],
                    env: {
                        port: '<%= pkg.serverPort %>'
                    },
                    cwd: __dirname
                }
            }
        },

        casperjs: {
            test: {
                path: 'test/itg',
                initFiles: [
                    'app/bower_components/moment/min/moment.min.js',
                    'app/bower_components/lodash/lodash.min.js',
                    'test/casper-utils.js'
                ],
                results: 'target/surefire-reports/casper-results.xml',
                loglevel: 'info',
                port: 5000,
                timeout: 5000
            }
        },

        trim: {
            content: {
                files: ['target/js/<%= pkg.name %>-<%= pkg.version %>.min.js']
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['app/scripts/vendor/*', 'app/i18n/*']
            },
            all: ['*.js', 'app/scripts/**/*.js', 'test/**/*.js', 'api/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('requirescriptconf', 'generate the script for requireJs conf', function () {
        var config = grunt.config('requirescriptconf.generate'),
            script = 'window.requirescriptconf = ' + JSON.stringify(config.conf) + ';';

        grunt.file.write(config.filepath, script, {
            encoding: 'utf8'
        });
    });

    grunt.registerTask('trimfiles', 'trim the content of files', function () {
        var config = grunt.config('trim.content'),
            i = 0,
            length = config.files.length;

        for (; i < length; i++) {
            var content = grunt.file.read(config.files[i], {
                encoding: 'utf8'
            });

            grunt.file.write(config.files[i], content.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' '), {
                encoding: 'utf8'
            });
        }
    });

    grunt.registerTask('wait', 'casperserver', function () {
        var done = this.async();
        setTimeout(function () {
            done();
        }, 1000);
    });

    grunt.registerTask('casperport', 'casperserver', function () {
        var done = this.async();
        portscanner.findAPortNotInUse(5000, 6000, 'localhost', function (error, port) {
            grunt.config.set('express.casper.options.args', ['prod', 'port=' + port]);
            grunt.config.set('casperjs.test.port', port);
            grunt.log.write('Found empty port at ' + port + '\n');
            done();
        });
    });

    grunt.registerTask('casperjs', 'casperjs task', function () {
        var done = this.async();
        var config = grunt.config('casperjs.test');
        var path = grunt.option('path');

        grunt.util.spawn({
            cmd: 'casperjs',
            opts: { stdio: 'inherit' },
            args: [
                'test',
                path || config.path,
                '--includes=' + config.initFiles.join(','),
                '--post=test/casper-end.js',
                '--xunit=' + config.results,
                '--verbose',
                '--log-level=' + config.loglevel,
                '--port=' + config.port,
                '--timeout=' + config.timeout
            ]
        }, function (errorObj, result, code) {
            if (code > 0) {
                grunt.log.error(result.stdout);
                return done(false);
            }
            if (result.stdout) {
                grunt.log.write(result.stdout + '\n\n');
            }
            if (result.stderr) {
                grunt.log.write(result.stderr + '\n\n');
            }
            return done();
        });
    });

    grunt.registerTask('validate', ['jshint:all']);
    grunt.registerTask('compile:beautify', ['requirejs:beautify']);
    grunt.registerTask('compile:uglify', ['requirejs:uglify', 'trimfiles']);
    grunt.registerTask('compile', ['compile:beautify', 'compile:uglify', 'less']);
    grunt.registerTask('test', ['requirescriptconf', 'karma:unit']);
    grunt.registerTask('watch', ['requirescriptconf', 'karma:watch']);
    grunt.registerTask('itg', ['casperport', 'express:casper', 'wait', 'casperjs', 'express:prod:stop']);
    grunt.registerTask('testitg', ['compile:uglify', 'less', 'itg']);
    grunt.registerTask('serverdev', ['express:dev']);
    grunt.registerTask('serverprod', ['express:prod']);
    grunt.registerTask('default', ['compile']);
    grunt.registerTask('commit', ['validate', 'compile:uglify', 'less', 'test', 'itg']);
};
