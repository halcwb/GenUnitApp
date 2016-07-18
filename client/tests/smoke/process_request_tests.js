/**
 * Created by halcwb on 18/07/16.
 */

/* global dump, expect, assert, webix, $$, app */


describe("Smoke process request tests", function () {
   "use strict";

    it("should echo the test request with response", function (done) {
        var test = { act: 'test', qry: {} };

        var promise = webix.ajax().post("http://localhost:3000/request", JSON.stringify(test));

        promise.then(function (resp) {
            console.log('resp', app.util.inspect(resp));
            done();
        }).fail(function (err) {
            console.log('err', JSON.stringify(err));
            throw(err);
        });

    });
});