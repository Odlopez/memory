var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var plumber = require("gulp-plumber");
var postcss = require('gulp-postcss');
var gulpBemCss = require('gulp-bem-css');
var webp = require('gulp-webp');
var run = require('run-sequence');
var del = require('del');
var rename = require("gulp-rename");
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pump = require('pump');
var imagemin = require('gulp-tinypng');

gulp.task("style", function() {
  gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/*.html", ["html"]).on("change", server.reload);
  gulp.watch("source/js/*.js", ["jsChange"]).on("change", server.reload);
});

gulp.task('imagemin', function () {
  gulp.src('source/img/**/bg.{png,jpg}')
      .pipe(imagemin('yfuUnokTCAx6XYDiJ7c5t6ERd7MXWrrd'))
      .pipe(gulp.dest('source/img'));
});

gulp.task('bem-less', () => {
  return gulp.src('source/*.html')
    .pipe(gulpBemCss({
      folder: 'source/less',
      extension: 'less',
      elementSeparator: '__',
      modifierSeparator: '--'
    }))
    .pipe(gulp.dest('source'));
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.*",
      "source/img/**",
      "source/js/**",
      "source/*.html"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
})

gulp.task("copyHTML", function () {
  return gulp.src([
      "source/*.html"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
})

gulp.task("copyJS", function () {
  return gulp.src([
      "source/js/**"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
})

gulp.task("jsChange", function (done) {
  run(
    "copyJS",
    "compress",
    done
  );
});


gulp.task("html", function (done) {
  run(
    "copyHTML",
    "htmlmin",
    done
  );
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task('minify', function () {
  return gulp.src('build/css/style.css')
      .pipe(csso())
      .pipe(gulp.dest('build/css'));
});

gulp.task('htmlmin', function() {
  return gulp.src("build/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("compress", function (cb) {
  pump([
      gulp.src("build/js/*.js"),
      uglify(),
      gulp.dest("build/js")
    ],
    cb
  );
});

gulp.task('webp', () => {
  return gulp.src('source/img/*.{png,jpg}')
    .pipe(webp())
    .pipe(gulp.dest('source/img'))
});

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "htmlmin",
    "compress",
    done
  );
});
