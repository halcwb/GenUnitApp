/**
 * @module views/ui
 */

/*global $$, webix */

(function () {
    "use strict";


    /**
     * Initialize ui with app.
     * app provides: </br>
     * </br>
     * - debug function</br>
     * - bus object</br>
     * </br>
     * expects: require function and webix lib
     * @param app {app} - Provides app functionality
     */
    exports.init = function (app) {

        var header = require('./bars/header.js'),
            menu = require('./menus/sideMenu.js'),
            convert = require('./forms/convert.js'),
            expression = require('./forms/expression.js'),
            result = require('./lists/result.js'),
            status = require('./templates/bottomBar.js'),
            debug = app.debug('views:ui');


        debug('init');


        // **** Create Views ****

        webix.ui.fullScreen();

        webix.ui({
            id: 'ui',
            rows: [
                header.view(app),
                { cols: [
                    {rows: [
                        expression.view(app),
                        convert.view(app),
                        { template: '' }
                    ]},
                    { view: 'resizer'},
                    result.view(app)
                ]},
                status.view(app)
            ]
        });


        // **** Initialize Views ****

        menu.init(app);

        convert.init(app);
        expression.init(app);
        result.init(app);
        status.init(app);

        require('./windows/alert.js').init(app);


        // **** Views Initialized ****

        app.bus.view.publish('ui.init');

    };

})();