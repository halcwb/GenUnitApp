/**
 * @module controllers/convert
 */

/*global _, console, $$ */

(function () {
    "use strict";

    /**
     * Initializes the controller
     * @param app
     */
    exports.init = function (app) {

        var debug = app.debug('client:controllers:unitConvert');

        app.bus.view.subscribe('convert.convert', function (data, envelope) {
            app.loading(true);

            app.request.request('convert', data).then(function(resp) {
                debug('got: ', resp);
                app.bus.controller.publish('convert.result', {
                    result: resp.json().result.text
                });

                app.loading(false);

            }).fail(function (err) {
                debug('error', err);
                var result = { result: 'cannot convert: ' + data.value + " " + data.fromUnit + '</br>' + err.responseText};

                app.bus.controller.publish('convert.result', result);
                app.loading(false);

            });

        });

    };

})();