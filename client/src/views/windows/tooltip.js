/**
 * module views/windows/tooltip
 */

/* global webix */

(function () {
    "use strict";

    exports.init = function (app) {
        webix.ui({
            id: 'tooltip',
            view: 'tooltip',
            template: '#text#',
            height: 100
        });
    };

})();