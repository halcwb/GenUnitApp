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
    exports.getMessage = function () {
        debug('request message');
        return webix.ajax().post("/msg");
    };

})();
