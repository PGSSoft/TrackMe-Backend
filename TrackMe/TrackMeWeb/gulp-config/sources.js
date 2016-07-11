var paths = require('./paths');

var sources = {};
sources.defaultBase = paths.app;

// dev serving
sources.index = paths.app + 'index.html';

// files handled by sass recipe
sources.sass = [
    paths.app + 'components/**/*.{sass,scss}',
    paths.app + 'pages/**/*.{sass,scss}',
    paths.app + '*.{sass,scss}'
];

// files handled by css recipe
sources.css = [
    paths.app + 'components/**/*.css',
    paths.app + 'pages/**/*.css',
    paths.app + '*.css'
];

// files handled by babel recipe
sources.babel = [
    paths.app + 'components/**/*.js',
    paths.app + 'pages/**/*.js',
    paths.app + '*.js'
];

// split files into variables by categories
var bowerFiles = {
    files: [
        // most of the generic bower modules
        paths.app + 'bower_components/*/*.js',
        paths.app + 'bower_components/*/{dist,dist/js,dist/css,min,release}/*.{js,css}',
		paths.app + 'bower_components/*/*.css', //aj
		paths.app + '*.css'
    ],
    // do not watch bower files, as the change is very unlikely and it adds a lot of overhead to the filesystem
    watch: false
};

var angularTemplates = [
    // every html file in project is a template for angular, except index
    paths.app + 'components/**/*.html',
    paths.app + 'pages/**/*.html',
    paths.app + '*.html',
    '!' + paths.app + 'index.html'
];

// Files not handled by other tasks that need to be passed into pipemin (possibly referenced in index.html).
// If you don't handle css or js by other tasks, pass them here.
sources.assets = [bowerFiles];

// Files not handled by other tasks that need to be included into build, bypassing pipemin entirely.
// These files are also watched in development.
sources.build = [angularTemplates];

module.exports = sources;