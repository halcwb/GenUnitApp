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

    var reload  = require("./lib/util/reload.js");


    // Make underscore globally available
    window._ = require('underscore');


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
    app.debug = require('debug');


    /**
     * Message bus
     * @memberof app
     * @property bus
     */
    app.bus = require('./lib/util/msgBus.js');


    /**
     * Request function
     * @memberof app
     * @method request
     */
    app.request = require('./lib/ajax/request');


    // **** Starting reload for development ****

    reload.init();


    // **** Initialize UI ****

    require('./views/ui.js').init(app);


    // **** Initialize Loading Mask ****

    require('./views/windows/loadingMask').view(app);


    // **** Initialize Controllers ****

    require('./controllers/convert.js').init(app);
    require('./controllers/evaluate.js').init(app);


    // **** Show welcome message ****

    app.debug('client:app')("Starting the app!, ok");
    app.request.message().then(function (resp) {
        webix.alert(resp.text());
    });


});
