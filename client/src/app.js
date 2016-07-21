
/**
* @file The entry point the application, creates the app
*/


/*global webix, $$, console, app, debug */

"use strict";

/**
* Starts the application:
* 1. Check if in development mode
* 2. If in development mode automate reload
* 3. Create the GUI 
* @namespace app
*/
webix.ready(function () {

    /**
    * Debug factory
    * @memberof app
    * @method debug
    */
    app.util  = require("util");
    app.debug = require("debug");
    var debug = app.debug('client:app');
    var reload = require("./lib/util/reload.js");
    var request = require("./lib/ajax/request.js");

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

    // handles the evaluate button click event
    var onClickEvaluate = function () {
        var text = $$('expression_text').getValue();
        var output = $$('result_template');

        debug('going to evaluate', text);

        doWait(true);
        request.evaluate(text).then(function(resp) {
            debug('got: ', resp);
            output.setHTML(resp.json().result.text);
            doWait(false);
        }).fail(function (err) {
            debug('error', err);
            output.setHTML('cannot evaluate: ' + text + '</br>' + err.responseText);
            doWait(false);
        });

    };

    // handles the evaluate button click event
    var onClickConvert = function () {
        var value = $$('value_text').getValue();
        var fromUnit = $$('from_units_combo').getValue();
        var toUnit = $$('to_units_combo').getValue();
        var output = $$('result_template');

        debug('going to convert', value + " " + fromUnit);

        doWait(true);
        request.convert(value, fromUnit, toUnit).then(function(resp) {
            debug('got: ', resp);
            output.setHTML(resp.json().result.text);
            doWait(false);
        }).fail(function (err) {
            debug('error', err);
            output.setHTML('cannot convert: ' + value + " " + fromUnit + '</br>' + err.responseText);
            doWait(false);
        });

    };

    var onFromUnitsComboClick = function () {
        debug('combo clicked', arguments);
        var list = $$('from_units_combo').getPopup().getList();

        if (list.count() === 0) {
            doWait(true);
            list.clearAll();
            request.units("").then(function (resp) {
                list.parse(resp.json().result.units);
                doWait(false);
            }).fail(function () {
                doWait(false);
            });
        }
    };

    var onFromUnitsComboChange = function (val) {
        debug('combo changed', val);
        var combo = $$('to_units_combo');
        var list = combo.getPopup().getList();
        var grp = val.match(/\[(.*?)\]/)[1];

        doWait(true);
        combo.setValue("");
        list.clearAll();
        request.units(grp).then(function (resp) {
            list.parse(resp.json().result.units);
            doWait(false);
        }).fail(function () {
            doWait(false);
        });
    };

    // starting reload for development
    reload.init();

    debug("Starting the app!, ok");
    request.message().then(function (resp) {
        webix.alert(resp.text());
    });

    // create the ui
    webix.ui({
        rows: [
            { type: 'header', template: 'GenUnitApp' },
            { cols: [
                {rows: [
                    { view: "form", id: 'expression_form', elements: [
                        { view:"text",
                            id: 'expression_text',
                            placeholder: "<expression>",
                            label: 'expression' },
                        { view:"button",
                            id: 'evaluate_button',
                            value: 'evaluate' }
                    ]},
                    { view: "form", id: 'convert_form', elements: [
                        { rows: [
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
                        ]}
                    ]}
                ]},
                { template: 'result', id: 'result_template' }
            ]}
        ]
    });

    // attach events
    $$('evaluate_button').attachEvent('onItemClick', onClickEvaluate);
    $$('from_units_combo').attachEvent('onItemclick', onFromUnitsComboClick);
    $$('from_units_combo').attachEvent('onChange', onFromUnitsComboChange);
    $$('convert_button').attachEvent('onItemClick', onClickConvert);

});
