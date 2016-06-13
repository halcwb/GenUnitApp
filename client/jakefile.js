// jakefile.js

(function () {

    desc("Run tests");
    task("tests", function () {
       console.log("\nRun tests ...\n") 
    });

    desc("Default build task");
    task("default", ["tests"], function () {
        console.log("\n\nBuild OK\n");
    });
    
})();

    