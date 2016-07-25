/**
 * @module controllers/units
 */

/*global $$ */

(function () {
    "use strict";

    exports.init = function (app) {

        var request = app.request;
        var debug = app.debug('client:controllers:units');


        app.bus.view.subscribe('convert.get_units', function (data, envelope) {

            debug('post', envelope);

            app.loading(true);
            request.units("").then(function (resp) {

                app.bus.controller.publish('units.from_units',{
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
            request.units(grp).then(function (resp) {

                app.bus.controller.publish('units.to_units',{
                    units: resp.json().result.units
                });

                app.loading(false);

            }).fail(function () {

                app.loading(false);
            });

        });

    };

})();