/*global webix, $$, console, app, debug */

"use strict";


/**
 * @file The entry point the application, creates the app
 * @requires util
 * @requires debug
 * @requires lib/util/reload
 * @requires lib/util/msgBus
 * @requires lib/ajax/request
 * @requires views/ui
 * @requires views/windows/loadingMask
 */

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
     * @property util {util} - Utility library
     */
    app.util  = require("util");


    /**
    * Debug factory
    * @memberof app
    * @method debug
    * @returns {function} debug function
    */
    app.debug = require('debug');


    /**
     * Message bus</br>
     * {@link module:lib/util/msgBus}
     * @memberof app
     * @property bus {lib/util/msgBus} - Provides message bus functionality
     */
    app.bus = require('./lib/util/msgBus.js');


    /**
     * Request object</br>
     * {@link module:lib/ajax/request}
     * @memberof app
     * @property request {lib/ajax/request} - provides request function
     */
    app.request = require('./lib/ajax/request.js');


    // **** Starting reload for development ****

    reload.init(app);


    // **** Initialize UI ****

    require('./views/ui.js').init(app);


    // **** Initialize Loading Mask ****

    require('./views/windows/loadingMask').view(app);


    // **** Initialize Controllers ****

    require('./controllers/convert.js').init(app);
    require('./controllers/evaluate.js').init(app);


    // **** Show welcome message ****

    app.debug('client:app')("Starting the app!, ok");
    app.request.request(function (resp) {
        var msg = "Can calculate:</br>100 ml[Volume] * 20 mg[Mass]/ml[Volume]=</br>" + resp.json().result.text;
        webix.alert(msg);
    }, function (err) {}, 'evaluate', {
        expr: '100 ml[Volume] * 20 mg[Mass]/ml[Volume]'
    });


});
