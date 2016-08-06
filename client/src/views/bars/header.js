/**
 * @module views/bars/header
 */

/*global $$ */

(function () {
    "use strict";

    var id = 'header';

    exports.view = function (app) {

        return {
            id: id,
            view: 'toolbar',
            elements: [
                {
                    view: 'icon',
                    icon: 'bars',
                    click: function () {
                        app.bus.view.publish('header.menu.click', {});
                    }
                },
                { view: 'label', label: 'GenUnitApp' }
            ]
        };

    };


})();