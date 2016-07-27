/**
 * @module controllers/evaluate
 */

(function () {
    "use strict";

    /**
     * Initializes the evaluate controller
     * @param app {app} Provides app functionality
     */
    exports.init = function (app) {
        var debug = app.debug('client:controllers:evaluate');

        app.bus.view.subscribe('expression.evaluate', function (data, envelope) {

            var succ = function (resp) {
                debug('post', envelope);

                app.bus.controller.publish('evaluate.result', {
                    expr: data.expr,
                    result: resp.json().result.text
                });
            };

            var fail = function (err) {
                var text = 'cannot evaluate: ' + data.expr + '</br>' + err.responseText;

                debug('error', err);

                app.bus.controller.publish('err', {
                    result: text
                });
            };

            app.loading(true);
            app.request.request(succ, fail, 'evaluate', data);
            app.loading(false);

        });

    };

})();