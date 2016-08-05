/**
 * @module controllers/convert
 */

/*global _, console, $$ */

(function () {
    "use strict";

    /**
     * Initializes the controller
     * @param app {app} Object with app functionality
     */
    exports.init = function (app) {

        var debug = app.debug('client:controllers:unitConvert');

        app.bus.view.subscribe('convert.convert', function (data, envelope) {

            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    debug('got: ', resp);
                    app.bus.controller.publish('convert.result', {
                        expr: data.value + " " + data.fromUnit,
                        result: resp.result.text
                    });
                },

                fail = function (err) {
                    debug('error', err);
                    var text = 'cannot convert: ' + data.value + " " + data.fromUnit + '</br>' + err.responseText;

                    app.bus.controller.publish('convert.err', {
                        err: text
                    });

                };

            app.loading(true);
            post(succ, fail, 'convert', data);
            app.loading(false);

        });


        app.bus.view.subscribe('convert.get_units', function (data, envelope) {

            debug('post', envelope);

            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    app.bus.controller.publish('convert.from_units',{
                        units: resp.result.units
                    });
                },

                fail = function (err) {
                    debug('err', err);
                };

            app.loading(true);
            post(succ, fail, 'getunits', { grp: '' });
            app.loading(false);

        });


        app.bus.view.subscribe('convert.unit_change', function (data, envelope) {
            var grp = data.value.match(/\[(.*?)]/)[1];

            debug('post', envelope);

            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                        app.bus.controller.publish('convert.to_units',{
                        units: resp.result.units
                    });
                },

                fail = function (err) {
                    debug('err', err);
                };

            app.loading(true);
            post(succ, fail, 'getunits', { grp: grp });
            app.loading(false);

        });

    };

})();