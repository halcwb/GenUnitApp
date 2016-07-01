/**
 * Created by halcwb on 17/06/16.
 */

// Automatically runs build when files change.

(function () {
    "use strict";

    var nodemon = require("nodemon");
    var debug = require('debug')('app:watch');
    var buildCommand = require("../config/build_command.js");
    var paths = require("../config/paths.js");

    var server = require('./server.js');

    debug("*** Using nodemon to run " + buildCommand.get() + ". Type 'rs<enter>' to force restart.");
    nodemon({
        runOnChangeOnly: true,
        ext: "sh bat json js html css",
        watch: [
            "src",
            "build",
            "spike"
        ],
        ignore: [
            "generated"
        ],
        exec: buildCommand.get() + " " + process.argv.slice(2).join(" "),
        execMap: {
            sh: "/bin/sh",
            bat: "cmd.exe /c",
            cmd: "cmd.exe /c"
        }
    }).on('exit', function (data) {
        // Exit is triggered twice :-(
        // But is triggered when build is complete
        debug('*** receiving exit');
        debug('*** reload clients');
        server.reload();
    }).on('stderr', function (data) {
        // Never triggered
        debug('*** receiving stderr', data);
    }).on('stdout', function (data) {
        // Never triggered
        debug('*** receiving stdout', data);
    }).on("restart", function (files) {
        // Restart is triggered twice on mac :-(
        debug("*** Restarting due to:", files);
    });

}());
