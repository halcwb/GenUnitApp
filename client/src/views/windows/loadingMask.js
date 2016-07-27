/**
 * @module views/windows/loadingMask
 */

/*global webix, $$ */

(function () {
    "use strict";

    var doWait = function (p) {
        if (p)
            webix.ui({
                id: "waitwindow",
                view: "window",

                width: 100,
                height: 100,
                modal: true,
                position: "center",
                head: false,
                borderless: true,
                body: {
                    template: "<p align='center'><i class='fa fa-spin fa-spinner fa-4x'></i></p>",
                    css: "wait"
                }
            }).show();
        else { $$('waitwindow').hide(); $$('waitwindow').destructor(); }
    };


    /**
     * loadingMask: </br>
     * creates a loading mask
     * @param app {app} uses app functionality
     * @returns {view} a loading mask view
     */
    exports.view = function (app) {

        // Subscribe to loading event
        app.bus.controller.subscribe("loading", function (data, envelope) {
            app.debug('client:views:loadingMask')('loading', envelope.topic, envelope.timeStamp);
            doWait(data.loading);
        });

        // Make app loading shortcut
        app.loading = function (loading) {
            app.bus.controller.publish('loading', {
                loading: loading
            });
        };

    };

})();

