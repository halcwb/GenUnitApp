/*global desc, task, jake, fail, complete, directory */
"use strict";


(function () {
    var debug = require('debug')('Jakefile');

    var GENERATED = "generated";
    var TEMP_TEST_DIR = GENERATED + "/test";

    var BROWSERS = [
        'Chrome',
        'Safari',
        'Firefox',
        'IE'
    ];

    var NODE_VERSION =  "v0.12.4";

    directory(TEMP_TEST_DIR);


    desc("Lint");
    task("lint", function () {
        debug("\n\nLint is running\n");

        var validate = require("./build/lint/lint_runner.js").validateFileList;

        var pass = validate(getClientFiles(), getLintOptions_Browser(), getGlobals()) &&
                   validate(getServerFiles(), getLintOptions_Node(), getGlobals());

        if (!pass) fail("Lint Client failed");
    });


    desc("Run tests");
    task("tests", ["lint", "test-lib"], function () {
       debug("\nRun tests ...\n");
    });


    desc("Test Server Code");
    task("test-lib", [TEMP_TEST_DIR], function () {
        debug("\n\nStart testing lib");

        var reporter = require("nodeunit").reporters.default;

        reporter.run(['tests/lib'], null, function (failures) {
                if (failures) fail('server tests fail!', failures);
                complete();
            }
        );

    }, { async: true });


    desc("Default build task");
    task("default", ["tests"], function () {
        debug("\n\nBuild OK\n");
    });


    function sh(cmd, errMessage, callback) {
        console.log("> " + cmd);

        var process = jake.createExec([cmd], { printStderr: false });
        var stdout = "";

        process.on('error', function () {
            console.log(stdout);
            callback(errMessage);
        });

        process.on('stdout', function (buffer) {
            stdout += buffer;
        });

        process.on('cmdEnd', function () {
            callback(stdout);
        });

        process.run();
    }


    function assertBrowserTested (output, browser) {
        if (output.indexOf(browser) !== -1)  {
            return true;
        }
        else {
            console.log('Browser was not tested: ' + browser);
            return false;
        }
    }


    function getServerFiles() {
        var files = new jake.FileList();
        files.include("**/**/*.js");
        files.exclude("./src/**");
        files.exclude("./node_modules/**");
        files.exclude("./tests/ui/**");
        files.exclude("./src/ui/**");

        return files.toArray();
    }


    function getClientFiles() {
        var files = new jake.FileList();
        files.include("./src/ui/**/*.js");
        files.include("./tests/ui/**/*.js");

        return files.toArray();
    }


    function getLintOptions_Global() {
        var options = {
            bitwise: true,
            curly: false,
            eqeqeq: true,
            forin: true,
            immed: true,
            latedef: 'nofunc',
            newcap: true,
            noarg: true,
            noempty: true,
            nonew: true,
            regexp: true,
            undef: true,
            strict: true,
            trailing: true,
        };
        return options;
    }


    function getLintOptions_Node() {
        var options = getLintOptions_Global();
        options.node = true;
        return options;
    }


    function getLintOptions_Browser() {
        var options = getLintOptions_Global();
        options.browser = true;
        options.expr = true;
        return options;
    }


    function getGlobals() {
        return {
            describe: false,
            it: false,
            beforeEach: false,
            afterEach: false
        };
    }

})();

    