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
        var qry = JSON.stringify({ expr: text });
        var req = JSON.stringify({ act: 'evaluate', qry: qry });
        return webix.ajax().post("/request", req);
    };

    exports.units = function (grp) {
        var qry = JSON.stringify({ grp: grp });
        var req = JSON.stringify({ act: 'getunits', qry : qry });
        return webix.ajax().post("/request", req);
    };

})();
