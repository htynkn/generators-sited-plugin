var gulp = require("gulp");
var ejs = require("gulp-ejs");
var clean = require("gulp-clean");
var watch = require("gulp-watch");
var rename = require("gulp-rename");
var serve = require("gulp-serve");
var mocha = require("gulp-mocha");

var fs = require("fs");
var UglifyJS = require("uglify-js");
var internalIp = require("internal-ip");
var qrcode = require("qrcode-terminal");

const port = 8000;

gulp.task("build", function() {
  var jsContent = fs.readFileSync("./src/index.js", "utf8");
  var packageContent = require("./package.json");

  return gulp
    .src("index.xml")
    .pipe(
      ejs({
        js: UglifyJS.minify(jsContent).code,
        packageVersion: process.env.BUILD_NUMBER
          ? Number(process.env.BUILD_NUMBER)
          : Number(0)
      })
    )
    .pipe(rename("index.sited.xml"))
    .pipe(gulp.dest("./dist"));
});

gulp.task("clean", function() {
  return gulp.src("./dist", { read: false }).pipe(clean());
});

gulp.task(
  "default",
  gulp.series("clean", function() {
    gulp.start("build");
  })
);

gulp.task("qr", function(done) {
  qrcode.generate(
    "http://" + internalIp.v4.sync() + ":" + port + "/index.sited.xml",
    function(qrcode) {
      console.log(qrcode);
      done();
    }
  );
});

gulp.task(
  "server",
  gulp.series(
    gulp.parallel("build", "qr"),
    serve({
      root: ["dist"],
      port: port,
      hostname: internalIp.v4.sync()
    })
  )
);

gulp.task(
  "watch",
  gulp.series("server", function() {
    return watch(["src/index.js", "config.js", "index.xml"], function() {
      gulp.start("build");
    });
  })
);
