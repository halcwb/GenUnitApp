/**
 * Created by halcwb on 18/07/16.
 */

/* global console, dump, expect, assert, webix, $$, app */

(function () {
    "use strict";


    describe("Smoke process request tests", function () {
        var HOME_URL = "http://localhost:3000/request";
        var foo, echo, evaluate, units, convert;

        this.retries(4);


        it("should not be able to process request with action foo", function (done) {
            var promise = webix.ajax().post(HOME_URL, JSON.stringify({
                act: 'foo',
                qry: ''
            }));

            console.log('test');
            promise.then(function (resp) {
                expect(resp.json().succ).to.be(false);
                done();
            }).fail(function (err) {
                console.log('echo test error', app.util.inspect(promise));
                done();
            });

        });


        it("should echo the request when action echo", function (done) {
            var promise = webix.ajax().post(HOME_URL, {
                act: 'echo',
                req: JSON.stringify({ expr: '20 ml[Volume] * 100 mg[Mass]/ml[Volume]' })
            });

            console.log('echo');
            promise.then(function (resp) {
                expect(resp.json().succ).to.be(true);
                expect(resp.json().result).to.eql({ act: 'echo', qry: '' });
                done();
            }).fail(function (err) {
                console.log('echo test error', app.util.inspect(promise));
                done();
            });

        });


        it ("should be able to request an evaluation of an expression", function (done) {
            var promise = webix.ajax().post(HOME_URL, JSON.stringify({
                act: 'evaluate',
                qry: JSON.stringify({ expr: '20 ml[Volume]' })
            }));

            console.log('evaluate');
            promise.then(function (resp) {
                expect(resp.json().succ).to.be(true);
                expect(resp.json().result.text).to.equal("20 ml[Volume]");
                done();
            }).fail(function (err) {
                console.log('req evaluate error', app.util.inspect(promise));
                done();
            });

        });

        it("getunits should get a list of units", function (done) {
            var promise = webix.ajax().post(HOME_URL, JSON.stringify({
                act: 'getunits',
                qry: JSON.stringify({ grp: ''})
            }));

            promise.then(function (resp) {
                expect(resp.json().succ).to.be(true);
                expect(resp.json().result.units).to.be.an(Array);
                done();
            }).fail(function () {
                console.log('get units failed', app.util.inspect(promise));
                done();
            });
        });

        it("can convert a value unit to a different unit", function (done) {
            var promise = webix.ajax().post(HOME_URL, JSON.stringify({
                act: 'convert',
                qry: JSON.stringify({ value: 1, fromUnit: 'g[Mass]', toUnit: 'g[Mass]'})
            }));


            promise.then(function (resp) {
                expect(resp.json().succ).to.be(true);
                done();
            }).fail(function () {
                console.log('convert value unit failed', app.util.inspect(promise));
                done();
            });
        });

    });

})();

