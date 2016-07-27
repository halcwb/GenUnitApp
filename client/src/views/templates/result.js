/**
 * @module views/templates/result
 */

/*global $$ */

(function () {
    "use strict";

    /**
     * Create the view
     * @param app {app} provides the app functionality
     * @returns {view} Returns the view
     */
    exports.view = function (app) {
        var debug = app.debug('client:views:templates:result');
        var id = 'result_template';
        var view = { template: 'result', id: id };

        debug('view');
        return view;
    };

    /**
     * Initializes the view
     * Uses the webix $$ to get the view
     * @param app {app} provides the app functionality
     */
    exports.init = function (app) {
        var debug = app.debug('client:views:templates:result');
        debug('init');

        app.bus.controller.subscribe('*.result', function (data /*, envelope */) {
            app.debug('client:resultTemplate')('result', data.result);
            $$('result_template').setHTML(data.result);
        });

    };

})();