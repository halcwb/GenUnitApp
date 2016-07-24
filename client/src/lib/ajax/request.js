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

    /**
     * evaluate an expression
     * @param text
     */
    exports.evaluate = function (text) {
        var qry = JSON.stringify({ expr: text });
        var req = JSON.stringify({ act: 'evaluate', qry: qry });
        return webix.ajax().post("/request", req);
    };

    /**
     * get units
     * @param grp
     */
    exports.units = function (grp) {
        var qry = JSON.stringify({ grp: grp });
        var req = JSON.stringify({ act: 'getunits', qry : qry });
        return webix.ajax().post("/request", req);
    };

    /**
     * convert
     * @param value
     * @param fromUnit
     * @param toUnit
     */
    exports.convert = function (value, fromUnit, toUnit) {
        var qry = JSON.stringify({ value: value, fromUnit: fromUnit, toUnit: toUnit });
        var req = JSON.stringify({ act: 'convert', qry : qry });
        return webix.ajax().post("/request", req);
    };


})();
