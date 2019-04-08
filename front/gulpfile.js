const gulp = require("gulp");
const sas = require("gulp-sass");
const ser = require("gulp-webserver");

gulp.task("sass", () => {
    return gulp.src("./src/sass/*.scss")
        .pipe(sas())
        .pipe(gulp.dest("./src/css"))
});
gulp.task("watching", () => {
    gulp.watch("./src/sass/*.scss", gulp.series("sass"));
});
gulp.task("wrbser", () => {
    return gulp.src("./src")
        .pipe(ser({
            port: 8085,
            proxies: [{
                source: "/app/getData",
                target: "http://localhost:3000/app/getData"
            }, {
                source: "/app/addData",
                target: "http://localhost:3000/app/addData"
            }]
        }))
})

gulp.task("default", gulp.series("sass", "wrbser", "watching"))