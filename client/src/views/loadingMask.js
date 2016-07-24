/**
 * @module views/loadingMask
 */

(function () {

    var doWait = function (p) {
        if (p)
            webix.ui({
                id: "waitwindow",
                view: "window",

                width: 100,
                height: 100,
                modal: true,
                position: "center",
                head: false,
                borderless: true,
                body: {
                    template: "<p align='center'><i class='fa fa-spin fa-spinner fa-4x'></i></p>",
                    css: "wait"
                }
            }).show();
        else { $$('waitwindow').hide(); $$('waitwindow').destructor(); }
    };


    /**
     * loadingMask: </br>
     * shows a loading mask if p = true
     * @param p
     */
    exports.loadingMask = doWait;

})();

