/**
 * Created by halcwb on 17/06/16.
 */
/*global webix, $$, console, app, debug */

"use strict";

webix.ready(function () {
    app.debug = require("debug");
    var debug = app.debug('client:app');
    var reload = require("../lib/util/reload.js");
    var msg = require("../lib/ajax/request.js").getMessage();

    // handles the calulcate button click
    var onClickCaclulate = function () {
      var text = $$('expression_text').getValue();
      debug('going to calcluate', text);
      $$('result_template').setHTML(text);
    };

    // starting reload for development
    reload.init();

    debug("Starting the app!, ok");
    msg.then(function (resp) {
        webix.alert(resp.text());
    });

    // create the ui
    webix.ui({
        rows: [
            { type: 'header', template: 'GenUnitApp' },
            { cols: [
                { view: "form", id: 'expression_form', elements: [
                    { view:"text",
                      id: 'expression_text',
                      placeholder:"<expression>",
                      label: 'expression' },
                    { view:"button",
                      id: 'expression_button',
                      value: 'calculate' }
                ]},
                { template: 'result', id: 'result_template' }
            ]}
        ]
    });

    // attach events
    $$('expression_button').attachEvent('onItemClick', onClickCaclulate);

});
