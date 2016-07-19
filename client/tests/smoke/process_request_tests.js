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
            expect(resp.json().succ).to.be(true);
            expect(resp.json().reqs[0].act = "test");
            done();
        }).fail(function (err) {
            throw(err);
        });

    });
});