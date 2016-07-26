/**
 * @module ui
 */

/*global webix */

(function () {
    "use strict";


    exports.init = function (app) {
        var convert = require('./forms/convert.js');
        var expression = require('./forms/expression.js');
        var result = require('./lists/result.js');
        var debug = app.debug('views:ui');

        debug('init');

        webix.ui({
            rows: [
                { type: 'header', template: 'GenUnitApp' },
                { cols: [
                    {rows: [
                        expression.view(app),
                        convert.view(app)
                    ]},
                    result.view(app)
                ]}
            ]
        });

        convert.init(app);
        expression.init(app);
        result.init(app);

        app.bus.view.publish('ui.init');
    };

})();