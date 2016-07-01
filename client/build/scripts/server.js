"use strict";

(function () {
    var debug = require('debug')('app:server');
    var app = require('express')();
    var ws = require('express-ws')(app);

    var PORT = process.env.PORT || 1337;

    // enable cors
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept");
        return next();
    });

    app.get('/', function (req, res, next) {
        debug('get route');
        res.send('hello');
        res.end();
    });

    app.ws('/', function (ws, req) {
        ws.on('message', function (msg) {
            debug('websocket message', msg);
        });
    });

    app.listen(PORT);
    debug('watch server started on port: ' + PORT);

    /// Broadcast the reload event to all clients.
    exports.reload = function () {
        ws.getWss().clients.forEach(function (client) {
            debug('*** broadcast reload message');
            client.send('reload');
        });
    };


}());
