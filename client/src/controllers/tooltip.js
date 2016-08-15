/**
 * module controllers/tooltip
 */

/* global $$ */

(function () {

    "use strict";

    exports.init = function (app) {
        var debug = app.debug('client:controllers:tooltip'),
            createUnits = 'Create units with the selected unit groups</br> Note that units will be created in the form: unit1/unit2/unit3',
            clearUnits = 'Clear the selected/created units and unit groups',
            convert = 'Convert a value with a unit to another unit',
            evaluate = 'Evaluate an expression<br>An expression should be in the form of:<br>number unit[Mass] * or / number unit[Mass] etc..';


        app.bus.view.subscribe('expression.evaluate.mouseenter', function (data, envelope) {
            debug(envelope);

            $$('tooltip').show({ text: evaluate }, { x: data.event.clientX, y: data.event.clientY });

        });


        app.bus.view.subscribe('convert.convert.mouseenter', function (data, envelope) {
            debug(envelope);

            $$('tooltip').show({ text: convert }, { x: data.event.clientX, y: data.event.clientY });

        });

        app.bus.view.subscribe('convert.groups.mouseenter', function (data, envelope) {
            debug(envelope);

            $$('tooltip').show({ text: createUnits }, { x: data.event.clientX, y: data.event.clientY });

        });

        app.bus.view.subscribe('convert.clear.mouseenter', function (data, envelope) {
            debug(envelope);

            $$('tooltip').show({ text: clearUnits }, { x: data.event.clientX, y: data.event.clientY });

        });
        app.bus.view.subscribe('*.*.mouseleave', function (data, envelope) {
            debug(envelope);

            $$('tooltip').hide();

        });

    };

})();