/**
 * @module controllers/app
 */

/* global $$ */

(function () {
    "use strict";

    /**
     * Initializes the controller
     * @param app {app} Object with app functionality
     * uses: </br>
     * app.debug</br>
     * app.bus.view.subscribe</br>
     * app.bus.controller.publish</br>
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

        app.bus.view.subscribe('sidemenu.itemclick', function (data) {
            var status;

            debug(data);
            if (data.id === '1') {
                app.settings.demo = !app.settings.demo;
                status = app.settings.demo ? 'demo' : 'online';
                app.bus.controller.publish('app.status', { status: status });
            }
        });

        app.bus.view.subscribe('header.menu.click', function () {
            if ($$('menu').config.hidden) {
                $$('menu').show();
            } else $$('menu').hide();

        });

        app.bus.controller.publish('app.status', { status: 'online' });

    };

})();