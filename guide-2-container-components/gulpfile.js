var gulp = require('gulp');
var cp = require('child_process');
var del = require('del');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var path = require('path');


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
 * API Server (Database)
 */

gulp.task('restore-database', function() {
  return gulp.src('./data/restore.json')
    .pipe(rename('db.json'))
    .pipe(gulp.dest('./data'));
});

gulp.task('serve:api', ['restore-database'], function(done) {
  var serverPath = path.join(__dirname, 'node_modules/.bin/json-server');
  cp.exec(serverPath + ' --watch ./data/db.json --port 3001', {stdio: 'inherit'})
    .on('close', done);
});


/**
 * Node Server (Express)
 */

gulp.task('serve:node', function(done) {
  var babelPath = path.join(__dirname, 'node_modules/.bin/babel-node');
  nodemon({
    exec: babelPath + ' ./server.js',
    watch: ['server.js'],
    ext: 'js html'
  });
});


/**
 * Main tasks
 */

gulp.task('serve', ['serve:node', 'serve:api']);
gulp.task('watch', ['build', 'watch:build']);
gulp.task('default', ['serve']);
