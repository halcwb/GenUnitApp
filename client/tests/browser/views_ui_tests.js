/**
 * Created by halcwb on 30/07/16.
 */

/*global expect, describe */

(function () {
    "use strict";

    var app,
        ui = require('../../src/views/ui.js');

    before(function () {
        app = {
            debug: function () { return function () {}; },
            bus: {
                controller: {
                    publish: function () {},
                    subscribe: function () {}
                },
                view: {
                    publish: function () { }
                }
            }
        };
    });

    describe('views/ui', function () {

        it('ui should be defined', function () {
            expect(ui).to.not.be(undefined);
        });

        it('should have an init function', function () {
            expect(ui.init).to.be.a('function');
        });

        it('init function should publish ui.init', function () {
            app.bus.view.publish = function (msg) {
                expect(msg).to.equal('ui.init');
            };

            ui.init(app);
        });

    });

})();