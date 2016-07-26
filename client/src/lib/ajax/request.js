/**
 * @module lib/ajax/request
 */

/*global webix, app */

(function () {
    "use strict";


    /**
     * request function
     * @param succ
     * @param fail
     * @param act
     * @param qry
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
