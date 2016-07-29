/**
 * Created by halcwb on 25/07/16.
 */

(function () {
    "use strict";

    var postal = require('postal');
    var subsription = postal.subscribe({
        channel: "units",
        topic: "get",
        callback: function (data, envelope) {
            console.log(data, envelope);
        }
    });

    postal.publish({
        channel: "units",
        topic: "get",
        data: ["mg", "mcg"]
    });

    var infoChannel = postal.channel('info');
    var warnChannel = postal.channel('warn');
    var errsChannel = postal.channel('errs');
    var reqsChannel = postal.channel('reqs');
    var resultChannel = postal.channel('result');

    infoChannel.subscribe("*", function (data, envelope) {
        console.log("info", data, envelope);
    });

    infoChannel.publish("info", {
        info: "hello world"
    });

})();