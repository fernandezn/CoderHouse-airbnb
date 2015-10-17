var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var babelify 		  = require('babelify');
var browserify 		  = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer 	  = require('vinyl-buffer');

// Servidor
gulp.task('serve', function() {
    browserSync.init({ proxy: "localhost:3041" });
    gulp.watch("./public/scss/**/*.scss", ['sass']);
    gulp.watch("./public/scripts/**/*.js", ['scripts']);
    gulp.watch("./public/**/*.html").on('change', browserSync.reload);
});

// Compila SASS a CSS y lo Inyecta en los Navegadores Conectados
gulp.task('sass', function() {
    return gulp.src("./public/scss/styles.scss")
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest("./public/css"))
        .pipe(browserSync.stream());
});

// Compila todos los archivos js en uno solo y lo inyecta en los Navegadores Conectados
gulp.task('scripts', function() {
	return browserify({ entries: './public/scripts/app.js', transform: [babelify] })
		.bundle()
		.pipe(vinylSourceStream('bundle.js'))
		.pipe(vinylBuffer())
		// .pipe(uglify())
		.pipe(gulp.dest('./public'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['sass','scripts','serve']);