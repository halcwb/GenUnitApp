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


        app.bus.view.subscribe('convert.get_units', function (data, envelope) {

            debug('post', envelope);

            app.loading(true);
            app.request.units("").then(function (resp) {

                app.bus.controller.publish('convert.from_units',{
                    units: resp.json().result.units
                });

                app.loading(false);

            }).fail(function () {

                app.loading(false);
            });

        });


        app.bus.view.subscribe('convert.unit_change', function (data, envelope) {
            var grp = data.value.match(/\[(.*?)]/)[1];

            debug('post', envelope);

            app.loading(true);
            app.request.units(grp).then(function (resp) {

                app.bus.controller.publish('convert.to_units',{
                    units: resp.json().result.units
                });

                app.loading(false);

            }).fail(function () {

                app.loading(false);
            });

        });



    };

})();