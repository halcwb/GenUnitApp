/*global WebSocket, app, window, webix */
"use strict";

(function () {

    exports.init = function () {
        var URL = '//localhost:1337';
        var debug = app.debug("client:reload");
        var resp = webix.ajax().get('http:' + URL);

        resp.then(function () {
            // we are in development
            app.debug.enable("client:*");
            debug('development mode started');

            // the development watch server is up
            // add a new websocket
            app.ws = new WebSocket('ws:' + URL);

            // getting a message is the sign
            // to reload
            app.ws.onmessage = function () {
                window.location.reload();
            };

            app.ws.onerror = function () {
                debug('no reload');
            };
        // no reaction from the development
        // server, so we are in production
      }).fail(function() {
          debug('no development server, no problem!');
      });
    };

})();
