const { src, dest, watch, parallel } = require('gulp');

//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//imagenes
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const webp = require('gulp-webp');

function css(done){
   
    src('src/scss/**/*.scss') //Identificar el archivo .SCSS a compilar
        .pipe(plumber()) // no detiene el workflow en caso de q tranq algo
        .pipe(sass()) //Compilar
        .pipe(dest('build/css')) // Almacenar en disco
    done();
}
function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function versionWebp( done ) {
    const opciones = {
        quality: 50
    };
    src('src/imagen/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}

function dev(done){
    //identifica el archivo y q tarea manda a llamar para un cambio
    //sin tener q compilar
    watch('src/scss/**/*.scss', css);
    done();
}


exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel(imagenes,dev);