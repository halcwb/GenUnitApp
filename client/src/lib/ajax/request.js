/**
 * @module lib/ajax/request
 */

/*global webix, _ */

(function () {
    "use strict";


    /**
     * create a request object from an action and a query object
     * @param act  {String} - The action that is requested
     * @param qry  {Object} - The query object for the requested action
     * @return {Object}     - The request object
     */
    exports.createReq = function (act, qry) {
        return JSON.stringify({
            act: act,
            qry: JSON.stringify(qry)
        });
    };


    exports.serverPost = function (succ, fail, act, qry) {
        var req = exports.createReq(act, qry);

        webix.ajax().post('/request', req).then(function (resp) {
            return succ(resp.json());
        }).fail(function (err) {
            return fail(err);
        });
    };


    exports.dataPost = function (succ, fail, act, qry) {
        var data = require('../../data/data.js').data,
            req = data[act], resp;

        if (req) {
            resp = _.filter(req.reqResp, function (el) {
                return _.isEqual(el.req, qry);
            });
            if (resp.length === 1) {
                succ(resp[0].resp);
                return;
            }
        }

        fail({ text: "Could not process" + act });
    };

    /**
     * request function
     * @requires webix
     * @param succ {Function} - Success function get's the resp object
     * @param fail {Function} - Failure function get's the err object
     * @param act  {String}   - The action that is requested
     * @param qry  {Object}   - The query object for the requested action
     * @return {Object}       - Result of succ or failure function
     */
    exports.post = function (demo, succ, fail, act, qry) {
        if (!demo) return exports.serverPost(succ, fail, act, qry);
        else return exports.dataPost(succ, fail, act, qry);
    };


})();
