/**
 * Created by halcwb on 17/06/16.
 */

// Automatically runs build when files change.

(function() {
  "use strict";

  var nodemon  = require("nodemon");
  var buildCommand = require("../config/build_command.js");
  var paths = require("../config/paths.js");

  var server = require('../../src/server/server.js');

  console.log("*** Using nodemon to run " + buildCommand.get() + ". Type 'rs<enter>' to force restart.");
  nodemon({
    stdin: true,
    stdout: true,
    ext: "sh bat json js html css",
    ignore: [paths.generatedDir, "spike"],
    exec: buildCommand.get() + " " + process.argv.slice(2).join(" "),
    execMap: {
      sh: "/bin/sh",
      bat: "cmd.exe /c",
      cmd: "cmd.exe /c"
    }
  }).on("restart", function (files) {
    console.log("*** Restarting due to:", files);
    server.reload();
  }).on('stdout', function (stdout) {
    // Never triggered
    console.log('receiving stdout');
  });

}());
