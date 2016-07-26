/**
 * @module views/lists/result
 */

/*global $$ */

(function () {
    "use strict";

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

    exports.init = function (app) {
        var debug = app.debug('client:views:lists:result');
        debug('init');

        app.bus.controller.subscribe('*.result', function (data /*, envelope */) {
            debug('result', data.result);
            $$('result_list').add({ expr: data.expr, result: data.result });
        });

    };

})();