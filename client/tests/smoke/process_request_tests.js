/**
 * Created by halcwb on 18/07/16.
 */

/* global dump, expect, assert, webix, $$, app */


describe("Smoke process request tests", function () {
    "use strict";

    var HOME_URL = "http://localhost:3000/request";
    var test1, test2, test3;


    before(function () {
        var req = { act: 'test1', qry: ""};

        console.log('running before');
        test1 = webix.ajax().post(HOME_URL, JSON.stringify(req));
        req.act = "test2";
        test2 = webix.ajax().post(HOME_URL, JSON.stringify(req));

        req.act = "evaluate";
        req.qry = JSON.stringify({ expr: "20 mL[Volume] * 100 mg[Mass]/ml[Volume]"});
        test3 = webix.ajax().post(HOME_URL, JSON.stringify(req));
        
    });

    it("should echo the test request with response", function (done) {
        var promise = test1;

        console.log('test1');
        promise.then(function (resp) {
            expect(resp.json().succ).to.be(true);
            done();
        }).fail(function (err) {
            console.log('echo test error', app.util.inspect(promise));
            done();
            throw(err);
        });

    });


    it("should echo the test request with response 2", function (done) {
        var promise = test2;

        console.log('test2');
        promise.then(function (resp) {
            expect(resp.json().succ).to.be(true);
            done();
        }).fail(function (err) {
            console.log('echo test error', app.util.inspect(promise));
            done();
            throw(err);
        });

    });


    it ("should be able to request an evaluation of an expression", function (done) {
        var promise = test3;

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
