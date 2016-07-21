
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

    // handles the evaluate button click event
    var onClickEvaluate = function () {
      var text = $$('expression_text').getValue();
      var output = $$('result_template');

      debug('going to evaluate', text);

      request.evaluate(text)
      .then(function(resp) {
          debug('got: ', resp);
          output.setHTML(resp.json().result.text);
      }).fail(function (err) {
          debug('error', err);
          output.setHTML('cannot evaluate: ' + text + '</br>' + err.responseText);
      });

    };

    var onFromUnitsComboClick = function () {
        debug('combo clicked', arguments);
        var list = $$('from_units_combo').getPopup().getList();

        if (list.count() === 0) {
            list.clearAll();
            request.units("").then(function (resp) {
                list.parse(resp.json().result.units);
            });
        }
    };

    var onFromUnitsComboChange = function (val) {
        debug('combo changed', val);
        var combo = $$('to_units_combo');
        var list = combo.getPopup().getList();
        var grp = val.match(/\[(.*?)\]/)[1];

        combo.setValue("");
        list.clearAll();
        request.units(grp).then(function (resp) {
            list.parse(resp.json().result.units);
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

});
