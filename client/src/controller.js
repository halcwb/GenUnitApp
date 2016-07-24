/**
 * @module controller
 */

/*global app, $$ */

(function () {
    "use strict";

    var debug   = app.debug('client:controller');
    var request = require("./lib/ajax/request.js");
    var doWait  = require("./views/loadingMask.js").loadingMask;

    /**
     * handles the evaluate button click event
     */
    exports.onClickEvaluate = function () {
        var text = $$('expression_text').getValue();
        var output = $$('result_template');

        debug('going to evaluate', text);

        doWait(true);
        request.evaluate(text).then(function(resp) {
            debug('got: ', resp);
            output.setHTML(resp.json().result.text);
            doWait(false);
        }).fail(function (err) {
            debug('error', err);
            output.setHTML('cannot evaluate: ' + text + '</br>' + err.responseText);
            doWait(false);
        });

    };

    /**
     * handles the evaluate button click event
     */
    exports.onClickConvert = function () {
        var value = $$('value_text').getValue();
        var fromUnit = $$('from_units_combo').getValue();
        var toUnit = $$('to_units_combo').getValue();
        var output = $$('result_template');

        debug('going to convert', value + " " + fromUnit);

        doWait(true);
        request.convert(value, fromUnit, toUnit).then(function(resp) {
            debug('got: ', resp);
            output.setHTML(resp.json().result.text);
            doWait(false);
        }).fail(function (err) {
            debug('error', err);
            output.setHTML('cannot convert: ' + value + " " + fromUnit + '</br>' + err.responseText);
            doWait(false);
        });

    };

    /**
     * handles the to units click event
     */
    exports.onFromUnitsComboClick = function () {
        debug('combo clicked', arguments);
        var list = $$('from_units_combo').getPopup().getList();

        if (list.count() === 0) {
            doWait(true);
            list.clearAll();
            request.units("").then(function (resp) {
                list.parse(resp.json().result.units);
                doWait(false);
            }).fail(function () {
                doWait(false);
            });
        }
    };

    /**
     * handles the from units click event
     */
    exports.onFromUnitsComboChange = function (val) {
        debug('combo changed', val);
        var combo = $$('to_units_combo');
        var list = combo.getPopup().getList();
        var grp = val.match(/\[(.*?)\]/)[1];

        doWait(true);
        combo.setValue("");
        list.clearAll();
        request.units(grp).then(function (resp) {
            list.parse(resp.json().result.units);
            doWait(false);
        }).fail(function () {
            doWait(false);
        });
    };



})();