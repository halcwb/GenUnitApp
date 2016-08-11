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


        app.bus.view.subscribe('convert.groups', function (data, envelope) {
            var grp = _.chain([data.group1, data.group2, data.group3]).filter(function (grp) {
                return (grp !== '');
            }).join('/').value();

            var post = _.partial(app.request.post, true),

                succ = function (resp) {
                    app.bus.controller.publish('convert.from_units', {
                        units: resp.result.units
                    });

                    app.bus.controller.publish('convert.to_units', {
                        units: resp.result.units
                    });
                },

                fail = function (err) {
                    debug('error', err);
                    var text = 'cannot get: ' + grp + '</br>' + err.responseText;

                    app.bus.controller.publish('convert.err', {
                        err: text
                    });

                };

            debug('envelope', envelope, 'group', grp);

            app.loading(true);
            post(succ, fail, 'getunits', { grp: grp });
            app.loading(false);

        });


        app.bus.view.subscribe('convert.*.groups', function (data, envelope) {

            debug('post', envelope);

            var post = _.partial(app.request.post, true),

                succ = function (resp) {
                    app.bus.controller.publish('convert.groups',{
                        groups: resp.result.groups
                    });
                },

                fail = function (err) {
                    debug('err', err);
                };

            app.loading(true);
            post(succ, fail, 'groups', {  });
            app.loading(false);

        });


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
            var grp = _.chain(data.value.split('/')).map(function (el) {
                return el.match(/\[(.*?)]/)[1];
            }).join('/').value();

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