/**
 * Created by halcwb on 17/06/16.
 */

// Automatically runs build when files change.

(function () {
    "use strict";

    var nodemon = require("nodemon");
    var debug = require('debug')('app:watch');
    var buildCommand = require("../config/build_command.js");

    var server = require('./server.js');

    debug("using nodemon to run " + buildCommand.get() + ". Type 'rs<enter>' to force restart.");
    nodemon({
        runOnChangeOnly: true,
        ext: "sh bat json js html css",
        watch: [
            "src",
            "build",
            "tests"
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
        debug('reload clients');
        server.reload();
    }).on("restart", function (files) {
        // Restart is triggered twice on mac :-(
        debug("restarting due to:", files);
    });

}());
