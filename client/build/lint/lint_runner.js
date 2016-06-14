/* Copyright (c) 2012 James Shore - See README.txt for license */
"use strict";

var jshint = require("jshint").JSHINT;
var fs = require("fs");
var debug = require('debug')('lint-runner');

exports.validateSource = function(sourceCode, options, globals, description) {
    description = description ? description + " " : "";
    var pass = jshint(sourceCode, options, globals);
    if (pass) {
        debug(description + "ok");
    }
    else {
        console.log(description + "failed");
        jshint.errors.forEach(function(error) {
            debug(error.line + ": " + error.evidence.trim());
            debug("   " + error.reason);
        });
    }
    return pass;
};

exports.validateFile = function(filename, options, globals) {
    var sourceCode = fs.readFileSync(filename, "utf8");
    return exports.validateSource(sourceCode, options, globals, filename);
};

exports.validateFileList = function(fileList, options, globals) {
    var pass = true;
    fileList.forEach(function(filename) {
        pass = exports.validateFile(filename, options, globals) && pass;
    });
    return pass;
};