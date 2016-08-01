/**
 * Created by halcwb on 18/07/16.
 */

/* global console, dump, expect, assert, webix, $$, app, _ */

(function () {
    "use strict";


    describe("Smoke process request tests", function () {
        var log = _.partial(console.log, 'smoke:process_request_tests'),
            HOME_URL = "http://localhost:3000/request",
            foo, echo, evaluate, units, convert;

        this.retries(2);


        it("should not be able to process request with action foo", function (done) {
            var promise = webix.ajax().post(HOME_URL, JSON.stringify({
                act: 'foo',
                qry: ''
            }));

            log('act: foo');
            promise.then(function (resp) {
                expect(resp.json().succ).to.be(false);
                done();
            }).fail(function (err) {
                log('foo test error', promise.state);
                done();
            });

        });


        it("should echo the request when action echo", function (done) {
            var promise = webix.ajax().post(HOME_URL, {
                act: 'echo',
                req: JSON.stringify({ expr: '20 ml[Volume] * 100 mg[Mass]/ml[Volume]' })
            });

            log('act: echo');
            promise.then(function (resp) {
                expect(resp.json().succ).to.be(true);
                expect(resp.json().result).to.eql({ act: 'echo', qry: '' });
                done();
            }).fail(function (err) {
                log('echo test error', promise.state);
                done();
            });

        });


        it ("should be able to request an evaluation of an expression", function (done) {
            var promise = webix.ajax().post(HOME_URL, JSON.stringify({
                act: 'evaluate',
                qry: JSON.stringify({ expr: '20 ml[Volume]' })
            }));

            log('act: evaluate');
            promise.then(function (resp) {
                expect(resp.json().succ).to.be(true);
                expect(resp.json().result.text).to.equal("20 ml[Volume]");
                done();
            }).fail(function (err) {
                log('req evaluate error', promise.state);
                done();
            });

        });

        it("getunits should get a list of units", function (done) {
            var promise = webix.ajax().post(HOME_URL, JSON.stringify({
                act: 'getunits',
                qry: JSON.stringify({ grp: ''})
            }));

            log('act: getunits');
            promise.then(function (resp) {
                expect(resp.json().succ).to.be(true);
                expect(resp.json().result.units).to.be.an(Array);
                done();
            }).fail(function () {
                log('get units failed', promise.state);
                done();
            });
        });

        it("can convert a value unit to a different unit", function (done) {
            var promise = webix.ajax().post(HOME_URL, JSON.stringify({
                act: 'convert',
                qry: JSON.stringify({ value: 1, fromUnit: 'g[Mass]', toUnit: 'g[Mass]'})
            }));

            log('act: convert');
            promise.then(function (resp) {
                expect(resp.json().succ).to.be(true);
                done();
            }).fail(function () {
                log('convert value unit failed', promise.state);
                done();
            });
        });

    });

})();

