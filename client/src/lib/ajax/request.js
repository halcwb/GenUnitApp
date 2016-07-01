/**
 * Created by halcwb on 18/06/16.
 */
/*global webix, app */

(function () {
    "use strict";

    var debug = app.debug('client:request');

    exports.getMessage = function () {
        debug('request message');
        return webix.ajax().post("/msg");
    };

})();