/**
 * Created by halcwb on 30/07/16.
 */

/*global expect, describe */

(function () {
    "use strict";

    describe('app', function () {

        var debug = require('debug')('app:app_tests'),
            app = require('../../src/app.js');

        before(function () {
            debug('starting ...');
        });

        it('should be defined', function () {
            expect(app).to.not.be(undefined);
            expect(app).to.eql({});
        });

        it('should add an app namespace', function () {
            expect(window.app).to.not.be(undefined);
        });

        it('should add a bus to app', function () {
            expect(window.app.bus).to.not.be(undefined);
        });

        it('should add a debug to app', function () {
            expect(window.app.debug).to.not.be(undefined);
        });

        it('should add a request to app', function () {
            expect(window.app.request).to.not.be(undefined);
        });

        it('should add a util to app', function () {
            expect(window.app.util).to.not.be(undefined);
        });

    });

})();