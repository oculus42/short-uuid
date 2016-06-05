/**
 * Created by Samuel on 6/5/2016.
 */
module.exports = function(grunt) {
    var banner = '/*\n<%= pkg.name %> <%= pkg.version %>';
    banner += '- <%= pkg.description %>\n<%= pkg.repository.url %>\n';
    banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        }
    });

    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.registerTask('default',
        ['mocha_istanbul']);

    grunt.registerTask('test',
        ['simplemocha']);

    grunt.registerTask('cover',
        ['mocha_istanbul']);
};