/**
 * @module views/forms/convert
 */

/*global webix, $$, _ */

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
            {
                view: "form", id: 'convert_form', elements: [
                { view: 'fieldset', label: 'Unit Groups', body: {
                        cols: [
                            {
                                view: 'button',
                                id: 'groups_button',
                                value: 'create units'
                            },
                            {
                                view: 'combo',
                                id: 'group1_combo',
                                name: 'group1_combo',
                                placeholder: '<group>',
                                options: [],
                                label: ''
                            },
                            {
                                view: 'combo',
                                id: 'group2_combo',
                                name: 'group2_combo',
                                placeholder: '<group>',
                                options: [],
                                label: ''
                            },
                            {
                                view: 'combo',
                                id: 'group3_combo',
                                name: 'group3_combo',
                                placeholder: '<group>',
                                options: [],
                                label: ''
                            }
                        ]
                    }
                },
                {
                    view: 'fieldset', label: 'Convert', body: {
                        cols: [
                            {
                                view:"text",
                                id: 'convert_value',
                                name: 'convert_value',
                                placeholder: "<value>",
                                label: 'value'
                            },
                            {
                                view:"combo",
                                id: 'from_units_combo',
                                name: 'from_units_combo',
                                placeholder: "<units>",
                                options: [],
                                label: ''
                            },
                            {
                                view:"label",
                                label: 'to',
                                width:  30,
                                align: 'center',
                                id: 'label_to'
                            },
                            {
                                view:"combo",
                                id: 'to_units_combo',
                                name: 'to_units_combo',
                                placeholder: "<units>",
                                options: [],
                                label: ''
                            }
                        ]
                    }
                },
                {
                    cols: [
                        {
                            view:"button",
                            id: 'convert_button',
                            value: 'convert'
                        },
                        {
                            view:"button",
                            id: 'convert_clear_button',
                            value: 'clear'
                        }
                    ]
                }
            ]
        };

        debug('view');
        return view;

    };

    /**
     * Initializes the form</br>
     * uses $$ webix function to attach events to widgets
     * @param app {app} Provides app functionality
     */
    exports.init = function (app) {
        var debug = app.debug('client:views:forms:convert');


        // **** Publish events ****


        $$('groups_button').attachEvent('onItemClick', function () {
            var grp1 = $$('group1_combo').getValue(),
                grp2 = $$('group2_combo').getValue(),
                grp3 = $$('group3_combo').getValue();

            app.bus.view.publish('convert.groups', {
                group1: grp1,
                group2: grp2,
                group3: grp3
            });
        });


        $$('group1_combo').attachEvent('onItemClick', function () {
            var list = $$('group1_combo').getPopup().getList();

            if (list.count() === 0) {
                app.bus.view.publish('convert.group1.groups', { units: list });
            }
        });


        $$('from_units_combo').attachEvent('onItemClick', function () {
            var list = $$('from_units_combo').getPopup().getList();

            if (list.count() === 0) {
                debug('publish convert.get_units');
                app.bus.view.publish('convert.get_units', { units: list });
            }
        });


        $$('convert_button').attachEvent('onItemClick', function () {
            var value =    $$('convert_value').getValue();
            var fromUnit = $$('from_units_combo').getValue();
            var toUnit =   $$('to_units_combo').getValue();

            debug("publish", value, fromUnit, toUnit);
            app.bus.view.publish('convert.convert', {
                value: value,
                fromUnit: fromUnit,
                toUnit: toUnit
            });
        });


        $$('convert_clear_button').attachEvent('onItemClick', function () {
            app.bus.view.publish('convert.clear', {});
        });


        $$('from_units_combo').attachEvent('onItemClick', function () {
            var list = $$('from_units_combo').getPopup().getList();

            if (list.count() === 0) {
                debug('publish convert.get_units');
                app.bus.view.publish('convert.get_units', { units: list });
            }
        });


        $$('from_units_combo').attachEvent('onChange', function (value) {
            if (value) {
                debug('publish convert.unit_change', value);
                app.bus.view.publish('convert.unit_change', { value: value });
            }
        });

        webix.event($$('groups_button').getInputNode(), 'mouseenter', function (e) {
            app.bus.view.publish('convert.groups.mouseenter', {
                event: e
            });
        });

        webix.event($$('groups_button').getInputNode(), 'mouseleave', function (e) {
            app.bus.view.publish('convert.groups.mouseleave', {
                event: e
            });
        });

        webix.event($$('convert_button').getInputNode(), 'mouseenter', function (e) {
            app.bus.view.publish('convert.convert.mouseenter', {
                event: e
            });
        });

        webix.event($$('convert_button').getInputNode(), 'mouseleave', function (e) {
            app.bus.view.publish('convert.convert.mouseleave', {
                event: e
            });
        });


        webix.event($$('convert_clear_button').getInputNode(), 'mouseenter', function (e) {
            app.bus.view.publish('convert.clear.mouseenter', {
                event: e
            });
        });

        webix.event($$('convert_clear_button').getInputNode(), 'mouseleave', function (e) {
            app.bus.view.publish('convert.clear.mouseleave', {
                event: e
            });
        });

        
        // **** Subscribe to controllers ****


        app.bus.controller.subscribe('convert.groups', function (data, envelope) {
            debug('post', envelope);
            _.forEach(['group1_combo', 'group2_combo', 'group3_combo'], function (id) {
                var combo = $$(id);
                var list = combo.getPopup().getList();

                list.parse(data.groups);
            });
        });


        app.bus.controller.subscribe('convert.from_units', function (data, envelope) {
            var combo = $$('from_units_combo');
            var list = combo.getPopup().getList();

            debug('post', envelope);
            list.parse(data.units);
        });


        app.bus.controller.subscribe('convert.to_units', function (data, envelope) {
            var combo = $$('to_units_combo');
            var list = combo.getPopup().getList();

            debug('post', envelope);
            combo.setValue("");
            list.clearAll();
            list.parse(data.units);
        });
    };


})();