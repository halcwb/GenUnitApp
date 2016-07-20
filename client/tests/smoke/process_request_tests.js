/**
 * Created by halcwb on 18/07/16.
 */

/* global dump, expect, assert, webix, $$, app */


describe("Smoke process request tests", function () {
    "use strict";

    var HOME_URL = "http://localhost:3000/request";
    var foo, echo, evaluate;


    before(function () {
        var req = { act: 'foo', qry: ""};

        foo = webix.ajax().post(HOME_URL, JSON.stringify(req));

        req.act = "echo";
        echo = webix.ajax().post(HOME_URL, JSON.stringify(req));

        req.act = "evaluate";
        req.qry = JSON.stringify({ expr: "20 mL[Volume] * 100 mg[Mass]/ml[Volume]"});
        evaluate = webix.ajax().post(HOME_URL, JSON.stringify(req));

    });

    it("should not be able to process request with action foo", function (done) {
        var promise = foo;

        console.log('test');
        promise.then(function (resp) {
            expect(resp.json().succ).to.be(false);
            done();
        }).fail(function (err) {
            console.log('echo test error', app.util.inspect(promise));
            done();
            throw(err);
        });

    });


    it("should echo the request when action echo", function (done) {
        var promise = echo;

        console.log('echo');
        promise.then(function (resp) {
            expect(resp.json().succ).to.be(true);
            expect(resp.json().result).to.eql({ act: 'echo', qry: '' });
            done();
        }).fail(function (err) {
            console.log('echo test error', app.util.inspect(promise));
            done();
            throw(err);
        });

    });


    it ("should be able to request an evaluation of an expression", function (done) {
        var promise = evaluate;

        console.log('evaluate');
        promise.then(function (resp) {
            expect(resp.json().succ).to.be(true);
            expect(resp.json().result.text).to.equal("2000 mg[Mass]");
            done();
        }).fail(function (err) {
            console.log('req evaluate error', app.util.inspect(promise));
            done();
            throw(err);
        });

    });


});
