/*global WebSocket, app, window, webix */
"use strict";

(function () {

  exports.init = function() {
    var URL = '//localhost:1337';

    var resp = webix.ajax().get('http:' + URL);

    resp.then(function () {
      // the development watch server is up
      // add a new websocket
      app.ws = new WebSocket('ws:' + URL);

      app.ws.onmessage = function (msg) {
        console.log('going to reload');
        window.location.reload();
      };

      app.ws.onerror = function () {
        console.log('no reload');
      };
    }).fail(/* no watch server, do nothing */);
  };

})();
