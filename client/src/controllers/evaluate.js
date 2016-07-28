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

                app.bus.controller.publish('evaluate.err', {
                    err: text
                });
            };

            app.loading(true);
            app.request.request(succ, fail, 'evaluate', data);
            app.loading(false);

        });

        app.bus.view.subscribe('ui.init', function (data, envelope) {

            var succ = function (resp) {
                var msg = "Can calculate:</br>100 ml[Volume] * 20 mg[Mass]/ml[Volume]=</br>" + resp.json().result.text;
                app.bus.controller.publish('app.alert', {
                    title: 'Welcome to the GenUnitApp',
                    text: msg
                });
            };

            var fail = function (err) {
                app.bus.publish('err', {
                    err: err
                });
            };

            app.request.request(succ, fail, 'evaluate', {
                expr: '100 ml[Volume] * 20 mg[Mass]/ml[Volume]'
            });

        });

    };

})();