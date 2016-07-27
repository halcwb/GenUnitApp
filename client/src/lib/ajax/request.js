/**
 * @module lib/ajax/request
 */

/*global webix, app */

(function () {
    "use strict";


    /**
     * request function
     * @requires webix
     * @param succ {Function} - Success function get's the resp object
     * @param fail {Function} - Failure function get's the err object
     * @param act  {String}   - The action that is requested
     * @param qry  {Object}   - The query object for the requested action
     * @return {Object}       - Result of succ or failure function
     */
    exports.request = function (succ, fail, act, qry) {
        var req = JSON.stringify({
            act: act,
            qry: JSON.stringify(qry)
        });

        webix.ajax().post('/request', req).then(function (resp) {
            return succ(resp);
        }).fail(function (err) {
            return fail(err);
        });

    };

})();
