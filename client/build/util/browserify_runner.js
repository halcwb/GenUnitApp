/**
 * Created by halcwb on 15/06/16.
 */
"use strict";

var fs = require("fs");
var path = require("path");
var browserify = require("browserify");

exports.bundle = function(config, success, failure) {
    var b = browserify(config.options);

    b.add(path.resolve(config.entry));
    b.bundle(function(err, bundle) {
        if (err) return failure(err);
        fs.writeFileSync(config.outfile, bundle);
        return success();
    });
};