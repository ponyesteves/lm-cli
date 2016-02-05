var gulp = require('gulp'),
  gutil = require('gulp-util'),
  coffee = require('gulp-coffee'),
  jade = require('gulp-jade'),
  inject = require('gulp-inject'),
  bowerFiles = require('main-bower-files'),
  webserver = require('gulp-webserver'),
  connect = require('gulp-connect'),
  del = require('del')

gulp.task('clean', function(){
  return del(['dist/*','!dist/images']);
});

gulp.task('coffee', function() {
  gulp.src('app/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('dist/'))
});

gulp.task('css', function() {
  gulp.src('app/styles/*.css')
  .pipe(gulp.dest('dist/styles'))
});

gulp.task('vendor', function() {
  gulp.src(bowerFiles())
  .pipe(gulp.dest('dist/vendor/'));
});


gulp.task('injects', function () {
  var bfiles = []
  bowerFiles().forEach(function(file){
    bfiles.push('dist/vendor/' + file.match(/\/([\w,\-,\_]+\.(min.)?(?:js|css))/)[1])
  });
  var target = gulp.src('app/index.jade'),
    sources = gulp.src(['./dist/**/*.js','!./dist/vendor/*.js','!./dist/node_modules/**/*.js','./dist/styles/*.css'], {read: false});
  return target.pipe(inject(sources, {ignorePath: 'dist'}))
    .pipe(inject(gulp.src(bfiles, {read: false}), {name: 'bower', ignorePath: 'dist'}))
    .pipe(gulp.dest('app/'));
});

gulp.task('jade', function () {
  gulp.src('app/**/*.jade')
  .pipe(jade().on('error', gutil.log))
  .pipe(gulp.dest('dist/'));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      middleware: function(req, res, next) {
        next();
      }
  }));
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port:3000,
    livereload: true
  });
});

gulp.task('default',['coffee', 'css', 'vendor', 'injects', 'jade', 'webserver'], function() {
  gulp.watch('app/**/*.coffee', ['coffee', 'vendor', 'injects', 'jade']);
  gulp.watch('app/**/*.jade', ['jade']);
  gulp.watch('app/**/*.css', ['css'])
})


gulp.task('prod', function() {
  gulp.src('dist')
    .pipe(webserver({
      host: '0.0.0.0',
      port: process.env.PORT || 80,
      livereload: false,
      directoryListing: false,
      open: true
  }));
});
