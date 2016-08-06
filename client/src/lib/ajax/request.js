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

    /**
     * server post function
     * @param succ {Function} - Success function get's the resp object
     * @param fail {Function} - Failure function get's the err object
     * @param act  {String}   - The action that is requested
     * @param qry  {Object}   - The query object for the requested action
     * @return {Object}       - Result of succ or failure function
     */
    exports.serverPost = function (succ, fail, act, qry) {
        var req = exports.createReq(act, qry);

        webix.ajax().post('/request', req).then(function (resp) {
            return succ(resp.json());
        }).fail(function (err) {
            return fail(err);
        });
    };


    /**
     * data post function
     * @requires underscore
     * @param succ {Function} - Success function get's the resp object
     * @param fail {Function} - Failure function get's the err object
     * @param act  {String}   - The action that is requested
     * @param qry  {Object}   - The query object for the requested action
     * @return {Object}       - Result of succ or failure function
     */
    exports.dataPost = function (succ, fail, act, qry) {
        var data = require('../../data/data.js').data,
            req = data[act], resp;

        if (req) {
            resp = _.filter(req.reqResp, function (el) {
                return _.isEqual(el.req, qry);
            });
            if (resp.length === 1) {
                return succ(resp[0].resp);
            }
        }

        fail({ text: "Could not process" + act });
    };


    /**
     * request post function
     * @requires webix
     * @param demo {bool}     - Use either server or demo data
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
