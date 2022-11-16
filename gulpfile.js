const { src, dest, series, watch } = require('gulp')
const del = require('del')
const njk = require('gulp-nunjucks-render')
const beautify = require('gulp-beautify')
const sass = require('gulp-sass')(require('sass'))

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

function watchFiles() {
  watch('src/scss/**/*', buildStyles)
  watch('src/html/**/*', html)
}

exports.build = series(clean, html, buildStyles)
exports.default = series(clean, html, buildStyles, watchFiles)
