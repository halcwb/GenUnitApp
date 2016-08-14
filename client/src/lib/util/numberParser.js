/**
 * @module lib/util/numberParser
 */

/*global _ */

(function () {

    "use strict";


    exports.parseFloatToString = function (f) {
        var s = f.toString(),
            del = s.indexOf('.') > 0 ? '.' : ',',
            dec = s.split(del).length === 1 ? 0 : s.split(del)[1].length;

        return parseInt(s.replace(del, "")) +  "/" + Math.pow(10, dec);
    };


    exports.parseStringToFloat = function (s) {
        var nd = _.isString(s) ? s.split('/') : [''],
            n = parseFloat(nd[0] === '' ? '0' : nd[0].replace(',', '.')),
            d = parseFloat(nd.length > 1 ? nd[1] : "1"),
            fix = exports.fixPrecision;

        return fix(n / d, 3);
    };


    exports.getPrecision = function(n, f) {
        var countFirstChar = function(c, t) {
                var i = 0;
                while (i < t.length && t[i] === c) {
                    i = i + 1;
                }
                return i;
            },
            fs = f.toString().split('.'),
            ns;

        ns = n - (fs[0] === '0' ? 0 : fs[0].length);
        ns = ns < 0 ? 0 : ns;
        ns = fs.length === 1 ? ns : countFirstChar('0', fs[1]) + ns;

        return ns;
    };


    exports.fixPrecision = function(f, p) {
        var getPrecision = exports.getPrecision,
            fix = function(f, d) {
                var dec = getPrecision(d, f);
                return Math.round(f * Math.pow(10, dec)) / Math.pow(10, dec);
            };

        return fix(f, p);

    };

})();