
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
    var onClickCaclulate = function () {
      var text = $$('expression_text').getValue();
      var output = $$('result_template');

      debug('going to evaluate', text);

      request.evaluate(text)
      .then(function(resp) {
          debug('got: ', resp);
          output.setHTML(resp.text());
      }).fail(function (err) {
          debug('error', err);
          output.setHTML('cannot evaluate: ' + text + '</br>' + err.responseText);
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
