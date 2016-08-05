/**
 * Created by halcwb on 30/07/16.
 */

/*global window, expect, describe */

(function () {
    "use strict";

    var app = require('../../src/controllers/app.js');

    describe('controller/app', function () {

        it('is defined', function () {
            expect(app).to.not.be(undefined);
        });

        it('publishes app.alert when bottomBar.click', function (done) {
            app.init(window.app);

            window.app.bus.controller.subscribe('app.alert', function (data) {
                done();
            });

            window.app.bus.view.publish('bottomBar.click', {});

            expect().fail();
        });

    });

})();