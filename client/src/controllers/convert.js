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

            var succ = function (resp) {
                debug('got: ', resp);
                app.bus.controller.publish('convert.result', {
                    expr: data.value + " " + data.fromUnit,
                    result: resp.json().result.text
                });
            };

            var fail = function (err) {
                debug('error', err);
                var result = { result: 'cannot convert: ' + data.value + " " + data.fromUnit + '</br>' + err.responseText};

                app.bus.controller.publish('err', result);

            };

            app.loading(true);
            app.request.request(succ, fail, 'convert', data);
            app.loading(false);


        });


        app.bus.view.subscribe('convert.get_units', function (data, envelope) {

            debug('post', envelope);

            var succ = function (resp) {
                app.bus.controller.publish('convert.from_units',{
                    units: resp.json().result.units
                });
            };

            var fail = function (err) {
                debug('err', err);
            };

            app.loading(true);
            app.request.request(succ, fail, 'getunits', { grp: '' });
            app.loading(false);


        });


        app.bus.view.subscribe('convert.unit_change', function (data, envelope) {
            var grp = data.value.match(/\[(.*?)]/)[1];

            debug('post', envelope);

            var succ = function (resp) {
                app.bus.controller.publish('convert.to_units',{
                    units: resp.json().result.units
                });
            };

            var fail = function (err) {
                debug('err', err);
            };

            app.loading(true);
            app.request.request(succ, fail, 'getunits', { grp: grp });
            app.loading(false);


        });



    };

})();