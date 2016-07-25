/**
 * @module views/templates/result
 */

/*global $$ */

(function () {
    "use strict";

    exports.view = function (app) {
        var debug = app.debug('client:views:templates:result');
        var id = 'result_template';
        var view = { template: 'result', id: id };

        debug('view');
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:views:templates:result');
        debug('init');

        app.bus.controller.subscribe('*.result', function (data /*, envelope */) {
            app.debug('client:resultTemplate')('result', data.result);
            $$('result_template').setHTML(data.result);
        });

    };

})();