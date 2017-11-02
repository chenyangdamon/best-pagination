/*
 * @Author: chenyang_pc
 * @Date:   2017-10-28 14:29:24
 * @Last Modified by:   chenyang_pc
 * @Last Modified time: 2017-11-01 18:18:23
 */
var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var eslint = require("gulp-eslint");
var clean = require("gulp-clean");
var changed = require("gulp-changed");
var cleancss = require("gulp-clean-css");
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require("run-sequence");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

gulp.task("copy:html", function() {
    return gulp.src(["./src/*"]).pipe(gulp.dest("./dist"));
});
gulp.task("copy:js", function() {
    return gulp.src(["./src/js/*"]).pipe(gulp.dest("./dist/js"));
});
// scss编译后的css将注入到浏览器里实现更新
gulp.task("scss", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(autoprefixer({
            browsers: [
                "last 2 versions",
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 20", // Firefox 24 is the latest ESR
                "Explorer >= 6",
                "iOS >= 4",
                "Opera >= 12",
                "Safari >= 6"
            ],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/css")).pipe(reload({
            stream: true
        }));
});
//压缩JS  
gulp.task("minify:js",["copy:js"], function() {
    gulp.src("./src/js/*.js")
        // .pipe(rename({
        //     suffix: ".min"
        // }))
        //rename压缩后的文件名 让main.js变成main.min.js  
        // .pipe(uglify()) //执行压缩  
        .pipe(gulp.dest("./dist/js"))
});
//压缩CSS  
gulp.task("minify:css", function() {
    return gulp.src("./src/css/*.css") //压缩的文件  
        .pipe(cleancss()).pipe(gulp.dest("./dist/css")); //输出文件夹  
});
//执行压缩前，先删除文件夹里的内容  
//执行删除的时候不要把目录定在build的子目录中，windows删除目录的同时会报错  
gulp.task("cleandir", function() {
    return gulp.src(["./dist"]).pipe(clean({
        force: true
    }));
});
// 静态服务器 + 监听 scss/html 文件
gulp.task("serve", function() {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch("./src/js/*.js", ["minify:js"]);
    gulp.watch("./src/*.html", ["copy:html"]);
    gulp.watch("./src/scss/*.scss", ["scss"]);
    gulp.watch(["./src/*.html", "./src/js/*.js"]).on("change", reload);
});
gulp.task("dev", function() {
    runSequence(
        ["cleandir"], // 第一步：清理目标目录
        ["scss"], ["copy:html", "minify:js"], // 第二步：打包 
        ["serve"] // 第三步：监控
    );
});