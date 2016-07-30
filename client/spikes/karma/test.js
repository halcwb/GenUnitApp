/**
 * Created by halcwb on 29/07/16.
 */

(function () {
    "use strict";

    webix.ready(function () {
        console.log('webix is ready');

        describe('karma', function () {

            it('should have run webix.ready', function () {
                console.log('running acutual test');
                expect(webix.readyHasRun).to.be(true);
            });
        });

        mocha.checkLeaks();
        mocha.run();
    });


})();