'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var fs = require('fs');
var path = require('path');
var foreach = require('gulp-foreach');
var minify = require("glsl-transition-minify");
var file = require('gulp-file');
var streamBuffers = require("stream-buffers");

gulp.task('process-glsl', function () {
        var tsText = `// This is generated automatically.
// DO NOT EDIT IT MANUALLY!
`;
        var items = [];
        return gulp.src('./src/glsl/**.glsl')
                .pipe(foreach(function (stream, file) {
                        // var key = path.basename(file.path, path.extname(file.path));
                        var key = path.basename(file.path);
                        var value = JSON.stringify(file.contents.toString("utf8"));
                        items.push({
                           name: key,
                           content: `export default ${value};`
                        });
                        return stream;
                        // .pipe(concat(file.name))
                })).on("end", function () {
                        for (var item of items) {
                                file(item.name + ".d.ts", item.content)
                                        .pipe(gulp.dest('src/ts/generated'))
                                        ;
                        }
                });
});
