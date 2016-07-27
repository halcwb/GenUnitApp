/**
 * @module views/lists/result
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
       var view = {
           id:'result_list',
           view: 'list',
           template: '#expr# = #result#',
           data: [
               { expr: "100 ml[Volume] * 20 mg[Mass]/ml[Volume]", result: "2000 mg[Mass]" }
           ]
       };

       return view;
    };

    /**
     * Initializes the view
     * Uses the webix $$ to get the view
     * @param app {app} provides the app functionality
     */
    exports.init = function (app) {
        var debug = app.debug('client:views:lists:result');
        debug('init');

        app.bus.controller.subscribe('*.result', function (data /*, envelope */) {
            debug('result', data.result);
            $$('result_list').add({ expr: data.expr, result: data.result });
        });

    };

})();