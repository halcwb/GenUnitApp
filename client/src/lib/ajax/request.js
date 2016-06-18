/**
 * Created by halcwb on 18/06/16.
 */
/*global webix*/

(function () {
    "use strict";

    exports.getMessage = function () {
        return webix.ajax().post("/msg");
    };

})();