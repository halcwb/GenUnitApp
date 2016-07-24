/*global webix, $$, console, app, debug */

/**
* @file The entry point the application, creates the app
*
*/

"use strict";

/**
* Starts the application: </br>
* 1. Check if in development mode </br>
* 2. If in development mode automate reload </br>
* 3. Create the GUI </br>
*
* @namespace app
*/
webix.ready(function () {

    /**
     * Util functions
     * @memberof app
     * @property util
     */
    app.util  = require("util");

    /**
    * Debug factory
    * @memberof app
    * @method debug
    */
    app.debug = require("debug");

    var debug   = app.debug('client:app');
    var reload  = require("./lib/util/reload.js");
    var request = require("./lib/ajax/request.js");
    var controller = require('./controller.js');

    var expressionForm =
        { view: "form", id: 'expression_form', elements: [
            { view:"text",
                id: 'expression_text',
                placeholder: "<expression>",
                label: 'expression' },
            { view:"button",
                id: 'evaluate_button',
                value: 'evaluate' }
        ]};

    var convertForm =
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
                    expressionForm,
                    convertForm
                ]},
                { template: 'result', id: 'result_template' }
            ]}
        ]
    });

    // attach events
    $$('evaluate_button').attachEvent('onItemClick', controller.onClickEvaluate);
    $$('from_units_combo').attachEvent('onItemclick', controller.onFromUnitsComboClick);
    $$('from_units_combo').attachEvent('onChange', controller.onFromUnitsComboChange);
    $$('convert_button').attachEvent('onItemClick', controller.onClickConvert);

});
