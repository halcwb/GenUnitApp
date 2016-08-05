/**
 * @module views/templates/bottomBar
 */

/*global webix, $$ */

(function () {
    "use strict";

    var id = 'bottom_bar_template';

    /**
     * Create the view
     * @param app {app} provides the app functionality
     * @returns {view} Returns the view
     */
    exports.view = function (app) {
        //noinspection JSUnresolvedFunction
        var debug = app.debug('client:views:templates:bottomBar'),
            view = {
                template: 'status: #status# | message: #message#',
                id: id,
                height: 30,
                data: { status: '', message: '' }
            };

        debug('view');
        //noinspection JSValidateTypes
        return view;
    };

    /**
     * Initializes the view
     * Uses the webix $$ to get the view
     * @param app {app} provides the app functionality
     */
    exports.init = function (app) {
        //noinspection JSUnresolvedFunction
        var debug = app.debug('client:views:templates:bottomBar');
        var view = $$('bottom_bar_template');

        debug('init');

        webix.event(view.$view, 'click', function () {
            app.bus.view.publish('bottomBar.click', {
                text: $$(id).getValues().message
            });
        });

        app.bus.controller.subscribe('*.status', function (data) {
            var bar = $$(id),
                vals = bar.getValues();

            vals.status = data.status;
            bar.setValues(vals);
        });

        //noinspection JSUnresolvedVariable
        app.bus.controller.subscribe('*.err', function (data /*, envelope */) {
            //noinspection JSUnresolvedFunction
            debug('result', data.result);
            var bar = $$(id),
                vals = bar.getValues();

            vals.message = data.err;
            bar.setValues(vals);
        });

    };


})();