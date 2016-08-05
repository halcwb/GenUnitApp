/**
 * @module views/windows/alert
 */

/*global webix */

(function () {
    "use strict";

    /**
     * Initializes the view
     * Uses the webix $$ to get the view
     * @param app {app} provides the app functionality
     */
    exports.init = function (app) {
        app.bus.controller.subscribe('app.alert', function (data, envelope) {
            var text = '';
            if (data.text) {
                text = data.text.substr(0, 200);
                if (text.length <= data.text.length) {
                    text = text + '...';
                }

                webix.alert({
                    title: data.title,
                    text: text,
                    callback: function () {
                        app.bus.view.publish('alert.click', { text: text });
                    }
                });

            }
        });
    };

})();