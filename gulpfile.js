const { src, dest, series, watch } = require('gulp')
const del = require('del')
const njk = require('gulp-nunjucks-render')
const beautify = require('gulp-beautify')
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')

function clean() {
  return del(['dist'])
}

function html() {
  return src('src/html/pages/*.+(html|njk)')
    .pipe(
      njk({
        path: ['src/html'],
      })
    )
    .pipe(beautify.html({ indent_size: 4, preserve_newlines: false }))
    .pipe(dest('dist'))
}

function buildStyles() {
  return src('src/scss/pages/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'));
}


function buildScripts() {
  return src('src/js/pages/*.js')
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

function watchFiles() {
  watch('src/scss/**/*', buildStyles)
  watch('src/js/**/*', buildScripts)
  watch('src/html/**/*', html)
}

exports.build = series(clean, html, buildStyles, buildScripts)
exports.default = series(clean, html, buildStyles, buildScripts, watchFiles)
