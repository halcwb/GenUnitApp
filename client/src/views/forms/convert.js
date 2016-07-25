/**
 * @module views/forms/convert
 */

/*global $$ */

(function () {
    "use strict";

    /**
     * Return the expression form
     * @param {object} app
     * @returns {view}
     */
    exports.view = function (app) {
        var debug = app.debug('client:views:forms:convert');
        var view =
            { view: "form", id: 'convert_form', elements: [
                { cols: [
                    { view:"text",
                        id: 'value_text',
                        placeholder: "<value>",
                        label: 'value' },
                    { view:"combo",
                        id: 'from_units_combo',
                        placeholder: "<units>",
                        options: [],
                        label: '' },
                    { view:"label",
                        label: 'to',
                        width:  30,
                        align: 'center',
                        id: 'label_to' },
                    { view:"combo",
                        id: 'to_units_combo',
                        placeholder: "<units>",
                        options: [],
                        label: '' }
                ] },
                { view:"button",
                    id: 'convert_button',
                    value: 'convert' }
            ]};

        debug('view');
        return view;

    };

    /**
     * Initializes the form
     * @param app
     */
    exports.init = function (app) {
        var debug = app.debug('client:views:forms:convert');


        // **** Publish events ****

        $$('convert_button').attachEvent('onItemClick', function () {
            var value =    $$('value_text').getValue();
            var fromUnit = $$('from_units_combo').getValue();
            var toUnit =   $$('to_units_combo').getValue();

            debug("publish", value, fromUnit, toUnit);
            app.bus.view.publish('convert.convert', {
                value: value,
                fromUnit: fromUnit,
                toUnit: toUnit
            });
        });


        $$('from_units_combo').attachEvent('onItemClick', function () {
            var list = $$('from_units_combo').getPopup().getList();

            if (list.count() === 0) {
                debug('publish convert.get_units');
                app.bus.view.publish('convert.get_units', { units: list });
            }
        });


        $$('from_units_combo').attachEvent('onChange', function (value) {
            debug('publish convert.unit_change');
            app.bus.view.publish('convert.unit_change', { value: value });
        });


        // **** Subscribe to controllers ****

        app.bus.controller.subscribe('units.from_units', function (data, envelope) {
            var combo = $$('from_units_combo');
            var list = combo.getPopup().getList();

            debug('post', envelope);
            list.parse(data.units);
        });


        app.bus.controller.subscribe('units.to_units', function (data, envelope) {
            var combo = $$('to_units_combo');
            var list = combo.getPopup().getList();

            debug('post', envelope);
            combo.setValue("");
            list.clearAll();
            list.parse(data.units);
        });
    };


})();