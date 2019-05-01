/**
 * Created by Samuel on 6/5/2016.
 */

function loadTasks(grunt) {
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-mocha-nyc');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
}

function registerTasks(grunt) {

    grunt.registerTask('default',
        ['mocha_nyc']);

    grunt.registerTask('test',
        ['simplemocha']);

    grunt.registerTask('cover',
        ['mocha_nyc']);

    grunt.registerTask('build',
        ['mkdir','browserify','uglify']);
}

function getMkdirData() {
    return {
        all: {
            options: {
                create: ['dist']
            }
        }
    };
}

function getBrowserifyData() {
    return {
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
    };
}

function getCoverageData() {
    return {
        coverage: {
            src: 'test', // a folder works nicely
            options: {
                mask: '*.js'
            }
        }
    };
}

function getSimpleMochaData() {
    return {
        options: {
            globals: ['expect'],
            timeout: 3000,
            ignoreLeaks: false,
            ui: 'bdd',
            reporter: 'tap'
        },
        all: { src: ['test/*.js'] }
    };
}

function getUglifyData() {
    return {
        options: {
            banner: '/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        my_target: {
            files: {
                'dist/short-uuid.min.js': ['dist/short-uuid.js']
            }
        }
    };
}
module.exports = function(grunt) {
    var banner = '/*\n<%= pkg.name %> <%= pkg.version %>';
    banner += '- <%= pkg.description %>\n<%= pkg.repository.url %>\n';
    banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: getBrowserifyData(),
        mkdir: getMkdirData(),
        mocha_nyc: getCoverageData(),
        simplemocha: getSimpleMochaData(),
        uglify: getUglifyData()
    });

    loadTasks(grunt);
    registerTasks(grunt);
};
