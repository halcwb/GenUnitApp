/**
 * Created by halcwb on 17/06/16.
 */

// A cross-platform mechanism for determining how to run the build

(function() {
    "use strict";

    var UNIX_BUILD_COMMAND = "./jake.sh";
    var WINDOWS_BUILD_COMMAND = "jake.cmd";

    var os = require("os");

    exports.get = function() {
        return os.platform() === "win32" ? WINDOWS_BUILD_COMMAND : UNIX_BUILD_COMMAND;
    };

})();
