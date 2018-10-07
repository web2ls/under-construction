// Command "gulp start" building with development env by default (env var = undefined)
// "gulp --production" for start building for production mode
// On start all files copying to build folder immediately

gulp = require('gulp');
minifycss = require('gulp-minify-css');
rename = require("gulp-rename");
mode = require('gulp-mode')();
babel = require('gulp-babel');
uglify = require('gulp-uglify');
htmlmin = require('gulp-htmlmin');
autoprefixer = require('gulp-autoprefixer');
pump = require('pump');
notify = require('gulp-notify');
browserSync = require('browser-sync');
reload = browserSync.reload;

var paths = {
  html: 'index.html',
  css: 'core.css',
  js: 'core.js',
  css_assets: 'assets/css/*.css',
  images_assets: 'assets/images/*.*'
};

gulp.task('buildHtmlOnStart', function() {
  gulp.src(paths.html)
    .pipe(mode.production(htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest('build'))
});

gulp.task('buildCssOnStart', function(cb) {
  pump([
      gulp.src(paths.css),
        autoprefixer(),
        mode.production(minifycss()),
        gulp.dest('build')
    ], 
    cb
  )
});

gulp.task('buildJsOnStart', function(cb) {
  pump([
      gulp.src(paths.js),
      mode.production(babel({ presets: ['env'] })),
      mode.production(uglify()),
      gulp.dest('build')
    ],
    cb
  );
});

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(mode.production(htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest('build'))
    .pipe(notify('HTML file has been changed'))
    .pipe(reload({stream: true}))
});

gulp.task('assets-css-minification', function() {
  gulp.src(paths.css_assets)
    .pipe(minifycss())
    .pipe(gulp.dest('build/assets/css'))
});

gulp.task('css', function(cb) {
  pump([
      gulp.src(paths.css),
        autoprefixer(),
        mode.production(minifycss()),
        gulp.dest('build'),
        notify('CSS file has been changed'),
        reload({stream: true})
    ], 
    cb
  )
});

gulp.task('js', function(cb) {
  pump([
      gulp.src(paths.js),
      mode.production(babel({ presets: ['env'] })),
      mode.production(uglify()),
      gulp.dest('build'),
      notify('JS file has been changed'),
      reload({stream: true})
    ],
    cb
  );
});

gulp.task('assets-images-copy', function() {
  console.log('copy image');
  gulp.src(paths.images_assets)
    .pipe(gulp.dest('build/assets/images'))
});

gulp.task('watcher', function() {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('sync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    notify: false,
    open: true,
    port: 8000
  });
});

gulp.task('default', ['watcher', 'sync', 'buildHtmlOnStart', 'buildCssOnStart', 'buildJsOnStart', 'assets-css-minification', 'assets-images-copy']);
