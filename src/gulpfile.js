const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");

//sass
function css() {
    return gulp.src("./styles/main.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(concat("style.css"))
        .pipe(gulp.dest("./"));
}
exports.css = css
function watch() {
    css()
    gulp.watch("./styles/**/*.scss", css);
}
exports.watch = watch