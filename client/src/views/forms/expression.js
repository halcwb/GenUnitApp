/**
 * @module views/forms/expression
 */

/*global webix, $$, window */

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
     * Initializes the form</br>
     * uses $$ webix function to attach events to widgets
     * @param app {app} Provides app functionality
     */
    exports.init = function (app) {
        var debug = app.debug('client:views:forms:expression');

        // **** Publish events *****


        $$('evaluate_button').attachEvent('onItemClick', function () {
            var text = $$('expression_text').getValue();

            app.bus.view.publish('expression.evaluate', {
                expr: text
            });
        });


        webix.event($$('evaluate_button').getInputNode(), 'mouseenter', function (e) {
            app.bus.view.publish('expression.evaluate.mouseenter', {
                event: e
            });
        });

        webix.event($$('evaluate_button').getInputNode(), 'mouseleave', function (e) {
            app.bus.view.publish('expression.evaluate.mouseleave', {
                event: e
            });
        });

        debug('init');
    };


})();