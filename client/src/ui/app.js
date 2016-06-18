/**
 * Created by halcwb on 17/06/16.
 */

"use strict";

(function () {
    var debug = require("debug")("app");
    var get_msg = require("../../spike/ajax/get_simple_msg.js");

    debug("Starting the app!");
    get_msg.getMessage();

})();