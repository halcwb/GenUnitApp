/**
 * @module views/forms/expression
 */

/*global $$ */

(function () {
    "use strict";

    /**
     * Creates an expression form
     * @param app
     * @returns {view}
     */
    exports.view = function (app) {
        var debug = app.debug('client:views:forms:expression');
        var id = "expression_form";
        var view =
            { view: "form", id: id, elements: [
                { view:"text",
                    id: 'expression_text',
                    placeholder: "<expression>",
                    label: 'expression' },
                { view:"button",
                    id: 'evaluate_button',
                    value: 'evaluate' }
            ]};

        debug('view');
        return view;

    };

    /**
     * Initializes the expression form
     * @param app
     */
    exports.init = function (app) {
        var debug = app.debug('client:views:forms:expression');

        // **** Publish events *****

        $$('evaluate_button').attachEvent('onItemClick', function () {
            var text = $$('expression_text').getValue();

            app.bus.view.publish('expression.evaluate', {
                expression: text
            });
        });


        debug('init');
    };


})();