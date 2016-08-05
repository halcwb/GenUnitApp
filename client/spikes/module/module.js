/**
 * Created by halcwb on 05/08/16.
 */

(function () {
    "use strict";

    exports.a = function (b) { console.log("applied a to " + b); };

    exports.b = function () { exports.a("exports.b"); };

})();