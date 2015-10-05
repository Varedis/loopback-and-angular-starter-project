var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    ngAnnotate = require('gulp-ng-annotate'),
    concat = require('gulp-concat'),
    ngHtml2Js = require('gulp-ng-html2js'),
    inject = require('gulp-inject'),
    clean = require('gulp-clean'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    replace = require('gulp-replace'),
    gulpAngularExtender = require('gulp-angular-extender'),
    revOutdated = require('gulp-rev-outdated'),
    babel = require('gulp-babel');

/******************************
 * SASS
 ******************************/
gulp.task('sass', function() {
    return gulp.src('./client/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./client/css/'));
});

/******************************
 * HTML
 ******************************/
gulp.task('create-templates', function() {
    return gulp.src('./client/js/**/*.tpl.html')
        .pipe(ngHtml2Js({
            moduleName: "app.templates",
            rename: function(url) {
                return url.replace('sections/', 'js/sections/');
            }
        }))
        .pipe(concat("app.templates.js"))
        .pipe(gulp.dest("./client/js/"));
});

gulp.task('inject-templates', ['create-templates'], function() {
    return gulp.src('./client/index.html')
        .pipe(inject(gulp.src('./client/js/app.templates.js', { read: false }), { ignorePath: 'client', addRootSlash: false }))
        .pipe(gulp.dest('./client/'));
});

gulp.task('usemin', ['sass', 'inject-templates'], function() {
    return gulp.src('./client/index.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat', rev()],
            js: [babel(), ngAnnotate(), uglify(), rev()],
            assets: [uglify(), rev()]
        }))
        .pipe(gulp.dest('./client/build'));
});

gulp.task('add-dependencies', ['usemin'], function() {
    return gulp.src('./client/build/app-*.min.js')
        .pipe(gulpAngularExtender({
            "app": [
                "app.templates"
            ]
        }))
        .pipe(gulp.dest('./client/build'));
});

gulp.task('clean', ['add-dependencies', 'usemin'], function() {
    gulp.src('./client/js/app.templates.js', { read: false })
        .pipe(clean());

    gulp.src('./client/index.html')
        .pipe(replace(/(<!--\s*inject:js\s*-->\s*)(\n*)(.*)(\n*)(\s*)(<!--\s*endinject\s*-->)/g, '$1$6'))
        .pipe(gulp.dest('./client'));

    return gulp.src(['./client/build/*.*'], { read: false })
        .pipe(revOutdated(1))
        .pipe(clean());

});

gulp.task('watch', function() {
    gulp.watch('./client/scss/**/*.scss', ['sass']);
    gulp.watch('./client/**/*.js', ['usemin']);
});


gulp.task('build', [
    'sass',
    'create-templates',
    'inject-templates',
    'usemin',
    'add-dependencies',
    //'copy-asset-files',
    'clean'
]);

gulp.task('default', [
    'watch',
    'sass'
]);

