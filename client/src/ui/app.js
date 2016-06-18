/**
 * Created by halcwb on 17/06/16.
 */
/*global webix, console*/

"use strict";

(function () {
    var debug = require("debug")("app");
    var msg = require("../lib/ajax/request.js").getMessage();

    debug("Starting the app!");
    msg.then(function (resp) {
        debug(resp);
        webix.alert(resp.text());
    });

})();