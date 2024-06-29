const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

// Tarefa para processar scripts
function scripts() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
}

// Tarefa para compilar Sass
function compileSass() {
    return gulp.src('./src/style/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/style'));
}

// Tarefa para otimizar imagens
function images() {
    return gulp.src('./src/image/**/*', { encoding: false })
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/image'));
}

// Tarefa para observar alterações nos arquivos
function watchFiles() {
    gulp.watch('./src/style/*.scss', compileSass);
    gulp.watch('./src/image/**/*', images);
    gulp.watch('./src/js/*.js', scripts);
}

// Exportando tarefas para uso com Gulp CLI
exports.compileSass = compileSass;
exports.watch = watchFiles;
exports.images = images;
exports.scripts = scripts;

// Tarefa padrão
exports.default = gulp.parallel(compileSass, images, scripts);