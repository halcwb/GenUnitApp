/**
 * Created by halcwb on 14/06/16.
 */

/* global dump, expect, assert, webix, $$, medcalc */


describe("Client", function () {
    "use strict";

    it("should run", function () {
        expect(1).to.equal(1);
    });

    it('should have the right version of webix loaded', function () {
        expect(webix).to.be.ok;
        expect(webix.version).to.equal('3.3.17');
    });

    it('should have the app loaded', function () {
        expect(app).to.be.ok;
    });

    it('should have an app.util', function () {
        expect(app.util.inspect).to.be.ok;
    });

});