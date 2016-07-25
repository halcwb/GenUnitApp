/**
 * @module lib/ajax/request
 */

/*global webix, app */

(function () {
    "use strict";


    /**
    * Get a message just to test that
    * the server is life.
    */
    exports.message = function () {
        var debug = app.debug('client:request');
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
     * request function
     * @param act
     * @param qry
     * @returns {*}
     */
    exports.request = function (act, qry) {
        var req = JSON.stringify({
            act: act,
            qry: JSON.stringify(qry)
        });

        return webix.ajax().post('/request', req);
    };

})();
