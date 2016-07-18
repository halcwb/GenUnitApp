/**
 * Created by halcwb on 18/07/16.
 */

/* global dump, expect, assert, webix, $$, medcalc */


describe("Smoke process request tests", function () {
   "use strict";

    it("should echo the test request with a = response", function () {
       webix.ajax().post("/request", { action: 'test', query: {} })
           .then(function (resp) {
            done();
           }).fail(function (errs) {
            throw(errs);
            done();
       });
    });
});