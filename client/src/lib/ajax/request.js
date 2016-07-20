/**
 * @module lib/ajax/request
 */

/*global webix, app */

(function () {
    "use strict";

    var debug = app.debug('client:request');

    /**
    * Get a message just to test that
    * the server is life.
    */
    exports.message = function () {
        debug('request message');
        return webix.ajax().post("/msg");
    };

    exports.evaluate = function (text) {
        return webix.ajax().post("/eval", { action: 'evaluate', text: text });
    };

})();
