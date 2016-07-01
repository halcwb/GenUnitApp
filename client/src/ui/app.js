/**
 * Created by halcwb on 17/06/16.
 */
/*global webix, console, app, debug */

"use strict";

webix.ready(function () {
    app.debug = require("debug");
    var debug = app.debug('client:app');
    var reload = require("../lib/util/reload.js");
    var msg = require("../lib/ajax/request.js").getMessage();

    // Starting reload for development
    reload.init();

    debug("Starting the app!, ok");
    msg.then(function (resp) {
        webix.alert(resp.text());
    });

});
