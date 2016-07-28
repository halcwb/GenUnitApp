/**
 * @module controllers/app
 */

(function () {
    "use strict";

    /**
     * Initializes the controller
     * @param app {app} Object with app functionality
     */
    exports.init = function (app) {
        var debug = app.debug('client:controllers:app');

        debug('init');
        app.bus.view.subscribe('bottomBar.click', function (data, envelope) {
            app.bus.controller.publish('app.alert', {
                title: 'Error',
                type: 'alert-error',
                text: data.text
            });
        });
    };

})();