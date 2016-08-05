/**
 * @module controllers/evaluate
 */


/*global _ */

(function () {
    "use strict";

    /**
     * Initializes the evaluate controller
     * @param app {app} Provides app functionality
     */
    exports.init = function (app) {
        var debug = app.debug('client:controllers:evaluate');

        app.bus.view.subscribe('expression.evaluate', function (data, envelope) {

            var post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    debug('post', envelope);

                    app.bus.controller.publish('evaluate.result', {
                        expr: data.expr,
                        result: resp.result.text
                    });
                },

                fail = function (err) {
                    var text = 'cannot evaluate: ' + data.expr + '</br>' + err.responseText;

                    debug('error', err);

                    app.bus.controller.publish('evaluate.err', {
                        err: text
                    });
                };

            app.loading(true);
            post(succ, fail, 'evaluate', data);
            app.loading(false);

        });

        app.bus.view.subscribe('ui.init', function (data, envelope) {

            var expr = '20 ml[Volume] * 10 mg[Mass]/ml[Volume]',

                post = _.partial(app.request.post, app.settings.demo),

                succ = function (resp) {
                    var msg = "Can calculate:</br>" + expr + "=</br>" + resp.result.text,

                        // propagate evaluate result on alert click
                        subs = app.bus.view.subscribe('alert.click', function () {
                            app.bus.controller.publish('evaluate.result', {
                                expr: expr,
                                result: resp.result.text
                            });
                            // make sure that subscription is only called once
                            app.bus.postal.unsubscribe(subs);
                        });

                    // publish alert msg
                    app.bus.controller.publish('app.alert', {
                        title: 'Welcome to the GenUnitApp',
                        text: msg
                    });

                },

                fail = function (err) {
                    app.bus.controller.publish('err', {
                        err: err
                    });
                };


            post(succ, fail, 'evaluate', {
                expr: expr
            });


        });

    };

})();