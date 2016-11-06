/**
 * Created by Samuel on 6/5/2016.
 */
module.exports = function(grunt) {
    var banner = '/*\n<%= pkg.name %> <%= pkg.version %>';
    banner += '- <%= pkg.description %>\n<%= pkg.repository.url %>\n';
    banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            "dist/short-uuid.js": ["index.js"],
            options: {
                browserifyOptions: {
                    builtins: false,
                    commondir: false,
                    detectGlobals: false,
                    insertGlobalVars: ['__filename', '__dirname'],
                    'standalone' : 'ShortUUID'
                }
            }
        },
        mkdir: {
            all: {
                options: {
                    create: ['dist']
                }
            }
        },
        mocha_istanbul: {
            coverage: {
                src: 'test', // a folder works nicely
                options: {
                    mask: '*.js'
                }
            }
        },
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },
            all: { src: ['test/*.js'] }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target: {
                files: {
                    'dist/short-uuid.min.js': ['dist/short-uuid.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.loadNpmTasks('grunt-mkdir');

    grunt.loadNpmTasks('grunt-browserify');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default',
        ['mocha_istanbul']);

    grunt.registerTask('test',
        ['simplemocha']);

    grunt.registerTask('cover',
        ['mocha_istanbul']);

    grunt.registerTask('build',
        ['mkdir','browserify','uglify']);
};