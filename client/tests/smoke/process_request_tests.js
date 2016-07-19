/**
 * Created by halcwb on 18/07/16.
 */

/* global dump, expect, assert, webix, $$, app */


describe("Smoke process request tests", function () {
    "use strict";

    var HOME_URL = "http://localhost:3000/request";


    it("should echo the test request with response", function (done) {
        var test = { act: 'test1', qry: {} };

        var promise = webix.ajax().post(HOME_URL, JSON.stringify(test));

        console.log('test1');
        promise.then(function (resp) {
            expect(resp.json().succ).to.be(true);
            expect(resp.json().reqs[0].act = "test1");
            done();
        }).fail(function (err) {
            console.log('echo test error', app.util.inspect(promise));
            done();
            throw(err);
        });

    });


    it("should echo the test request with response 2", function (done) {
        var test = { act: 'test2', qry: {} };

        var promise = webix.ajax().post(HOME_URL, JSON.stringify(test));

        console.log('test2');
        promise.then(function (resp) {
            expect(resp.json().succ).to.be(true);
            expect(resp.json().reqs[0].act = "test2");
            done();
        }).fail(function (err) {
            console.log('echo test error', app.util.inspect(promise));
            done();
            throw(err);
        });

    });


    it ("should be able to request an evaluation of an expression", function (done) {
        var req = { act: "evaluate", qry: { expr: "20 mL[Volume] * 100 mg[Mass]/ml[Volume]"}};

        var promise = webix.ajax().post(HOME_URL, JSON.stringify(req));


        console.log('test3');
        promise.then(function (resp) {
            expect(resp.json().succ).to.be(true);
            done();
        }).fail(function (err) {
            console.log('req evaluate error', app.util.inspect(promise));
            done();
            throw(err);
        });

    });

});
