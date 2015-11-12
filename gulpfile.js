'use strict';

var production = (process.argv[2] === 'dist' ? true : false);

var gulp       = require('gulp');
var webServer  = require('gulp-webserver');
var stylus     = require('gulp-stylus');
var nib        = require('nib');
var minifyCss  = require('gulp-minify-css');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');
var smoosher   = require('gulp-smoosher');
var imgOpt     = require('gulp-image-optimization');
var gulpif     = require('gulp-if');
var minifyHTML = require('gulp-minify-html');

var config = {
  styles: {
    main   : './src/styles/main.styl',
    src    : './src/styles/**/*.styl',
    dst    : './build/styles',
    dstDist: './dist/styles'
  },
  html: {
    src    : './src/**/*.html',
    dst    : './build',
    dstDist: './dist'
  },
  img: {
    src    : './src/img/**/*.jpg',
    dst    : './build/img',
    dstDist: './dist/img'
  },
  js: {
    main   : './src/js/main.js',
    src    : './src/js/**/*.js',
    dst    : './build/js',
    dstDist: './dist/js',
  }
};

gulp.task('server', function() {
  gulp.src('./build')
      .pipe(webServer({
        host: '0.0.0.0',
        livereload: true
      }));
});

gulp.task('build:css', function() {
  gulp.src(config.styles.main)
      .pipe(stylus({
        use: nib(),
        'include css': true
      }))
      .pipe(minifyCss())
      .pipe(gulpif(production,
                   gulp.dest(config.styles.dstDist),
                   gulp.dest(config.styles.dst)));
});

gulp.task('build:js', function() {
  return browserify(config.js.main)
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(gulpif(production, uglify()))
            .pipe(gulpif(production,
                         gulp.dest(config.js.dstDist),
                         gulp.dest(config.js.dst)));
});

gulp.task('build:html', function() {
  gulp.src(config.html.src)
      .pipe(gulpif(production,
                   gulp.dest(config.html.dstDist),
                   gulp.dest(config.html.dst)));
});

gulp.task('build:img', function() {
  gulp.src(config.img.src)
      .pipe(gulpif(production,imgOpt({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      })))
      .pipe(gulpif(production,
                   gulp.dest(config.img.dstDist),
                   gulp.dest(config.img.dst)));
});

gulp.task('watch', function() {
  gulp.watch(config.styles.src, ['build:css']);
  gulp.watch(config.html.src, ['build:html']);
  gulp.watch(config.js.src, ['build:js']);
  gulp.watch(config.img.src, ['build:img']);
});

gulp.task('build', ['build:css', 'build:html', 'build:img', 'build:js']);
gulp.task('default', ['server', 'watch', 'build']);
gulp.task('dist', ['build'], function() {
  gulp.src(config.html.dstDist + '/index.html')
      .pipe(smoosher())
      .pipe(minifyHTML())
      .pipe(gulp.dest(config.html.dstDist));
});
