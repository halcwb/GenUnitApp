/**
 * Created by halcwb on 17/06/16.
 */
/*global webix, console, app*/

"use strict";

webix.ready(function () {
  var debug = require("debug")("jakefile");
  var reload = require("../lib/util/reload.js");
  var msg = require("../lib/ajax/request.js").getMessage();

  // Starting reload for development
  reload.init();

  console.log("Starting the app!, ok");
  msg.then(function (resp) {
      webix.alert(resp.text());
  });

});
