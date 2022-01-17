const { src, dest, watch } = require('gulp'); 
const sass = require('gulp-sass')(require('sass'));

function css(done){
   
    src('src/scss/app.scss') //Identificar el archivo .SCSS a compilar
        .pipe(sass()) //Compilar
        .pipe(dest('build/css')) // Almacenar en disco
    done();
}

function dev(done){
    //identifica el archivo y q tarea manda a llamar para un cambio
    //sin tener q compilar
    watch('src/scss/app.scss', css);
    done();
}

function tarea(done){
    console.log('Desde la primer tarea');
    done();
}

exports.tarea = tarea;
exports.css = css;
exports.dev = dev;