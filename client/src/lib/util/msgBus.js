/**
 * @module lib/util/msgBus
 */

/*global app, $$ */

(function () {
    "use strict";

    var postal = require('postal');

    /**
     * controller channel
     */
    exports.controller = postal.channel('controller');

    /**
     * view channel
     */
    exports.view = postal.channel('view');

    /**
     * model channel
     */
    exports.model = postal.channel('model');

    /**
     * info channel
     */
    exports.info = postal.channel('info');

    /**
     * warning channel
     */
    exports.warn = postal.channel('warn');

    /**
     * errors channel
     */
    exports.errs = postal.channel('errs');

    /**
     * requests channel
     */
    exports.reqs = postal.channel('reqs');

    /**
     * postal object
     */
    exports.postal = postal;


})();