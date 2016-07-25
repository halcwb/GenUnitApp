/**
 * @module lib/util/msgBus
 */

/*global app, $$ */

(function () {
    "use strict";

    var postal = require('postal');

    exports.event = postal.channel('event');

    exports.controller = postal.channel('controller');

    exports.view = postal.channel('view');

    exports.model = postal.channel('model');

    exports.info = postal.channel('info');

    exports.warn = postal.channel('warn');

    exports.errs = postal.channel('errs');

    exports.reqs = postal.channel('reqs');

    exports.result = postal.channel('result');


})();