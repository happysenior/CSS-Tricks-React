var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var nodemon = require('gulp-nodemon');

/**
 * Build (Webpack)
 */

gulp.task('clean:build', function() {
    del('./public/js/*')
})

gulp.task('build', ['clean:build'], function() {
  return gulp.src('./app/app.js')
    .pipe(webpack(webpackConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./'));
});

gulp.task('watch:build', function() {
  return gulp.watch('./app/**/*', ['build']);
});


/**
 * Node Server (Express)
 */

gulp.task('serve:node', function(done) {
  nodemon({
    exec: 'DEBUG=cteaz* ./node_modules/.bin/babel-node ./server.js',
    watch: ['server.js'],
    ext: 'js html'
  });
});


/**
 * Main tasks
 */

gulp.task('serve', ['serve:node']);
gulp.task('watch', ['build', 'watch:build']);
gulp.task('default', ['serve']);
