/**
 * Created by halcwb on 25/07/16.
 */

(function () {
    "use strict";

    exports.init = function (app) {
        var request = app.request;
        var debug = app.debug('client:controllers:evaluate');

        app.bus.view.subscribe('expression.evaluate', function (data, envelope) {
            debug('post', envelope);

            app.loading(true);

            request.evaluate(data.expression).then(function(resp) {
                debug('got: ', resp);

                app.bus.controller.publish('evaluate.result', {
                    result: resp.json().result.text
                });

                app.loading(false);

            }).fail(function (err) {
                var text = 'cannot evaluate: ' + data.expression + '</br>' + err.responseText;

                debug('error', err);

                app.bus.controller.publish('evaluate.result', {
                    result: text
                });

                app.loading(false);
            });

        });

    };

})();