/**
 * Created by Knarfux on 02/03/2016.
 */

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 1, // maximum number of notifications from jshint output
                title: "Exanison", // defaults to the name in package.json, or will use project directory's name
                success: true, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            }
        },

        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './libs',
                    cleanTargetDir: true
                }
            }
        },
        jshint:{
            options:{
                force: true
            },
            all: ['Gruntfile.js',"tests/*.js" , "app/*.js"]
        },
        karma:{
            options:{
                configFile: 'unit-tests/karma.conf.js'
            },
            continuous: {
                singleRun: true,
                autoWatch: true
            },
            single:{
                singleRun: true,
                autoWatch: false
            }
        },
        protractor: {
            options: {
                configFile: "node_modules/protractor/example/conf.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false // If true, protractor will not use colors in its output.
            },
            target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: "e2e-tests/protractor.conf.js" // Target-specific config file
                }
            }
        },
        protractor_webdriver: {
            options: {
                command: 'webdriver-manager start'
            },
            target: {}
        },

        watch:{
            html:{
                options:{
                    livereload: true
                },
                files: ['app/*.html']
            },
            js:{
                files: ['app/*.js', "unit-tests/*js"],
                tasks:['concurrent:target'],
                options: {
                    atBegin: true
                }
            }
        },
        concurrent:{
            target:{
                options:{
                    logConcurrentOutput: true
                },
                tasks: [['jshint'], 'karma:continuous', 'protractor']
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-karma');

    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-protractor-webdriver');

    grunt.task.run('notify_hooks');

    grunt.registerTask('dev', ['jshint', 'watch']);
};