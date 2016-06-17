GenUnitApp Client
=================

This repository contains build and test automation for the GenUnitApp client. It is based on the excellent [automatopia](https://github.com/jamesshore/automatopia.git) setup by James Shore. It includes:

* Automated build (using Jake) with:
	* Linting (using JSHint)
	* Node.js tests (using Mocha)
	* Cross-browser tests (using Karma, Mocha, and expect.js)
	* Front-end modules (using Browserify)

This setup was originally developed for James Shore's [Let's Code: Test-Driven JavaScript](http://www.letscodejavascript.com) screencast. See Lessons Learned #16, [JavaScript Workflow 2015](http://www.letscodejavascript.com/v3/episodes/lessons_learned/16), for a detailed description of the front-end and continuous integration workflow.

Unlike the original setup of James Shore, this repository has a very restrictive policy concerning what goes into the repository. 
The basic setting is an 'opt-in' strategy. This ensure that only the necessary files to build the project are checked in, and no more.
The 'reliable build' is ensured by continuous integration running all test code in [Travis](https://travis-ci.org/halcwb/GenUnitApp) and [AppVeyor](https://ci.appveyor.com/project/halcwb/GenUnitApp).

To Use
------

Start out by downloading the code as described in "Download and Setup," below. Then:

* If you're a solo developer using this repository as a starting point for a personal project, follow the steps under "Building and Testing."

* If you're part of a team and planning to use the continuous integration script, follow the steps under "Continuous Integration." (If you *don't* plan to use the CI script, follow the steps under "Building and Testing" and supply your own CI tool.)

* If you're part of a team and planning to use the Heroku deployment script, follow the steps under "Deploying to Heroku." Note that the deployment script assumes you're also using the CI script.

Once you have it working, delete anything you don't need and modify anything you like. Make it your own.


Finding Your Way Around
-----------------------

This repository consists of the following directories:

* `build`: Build, CI, and deployment automation.
* `build/config`: Build configuration.
* `build/scripts`: Build scripts. Don't run them directly; they're used by the scripts in the root directory.
* `build/util`: Modules used by the build scripts.
* `node_modules`: npm dependencies. (Optional. See "Installing, Updating, and Removing npm Packages" below.)
* `src`: Example code.
* `src/ui`: Front-end code, meant to run in the browser.
* `src/lib`: Shared code that can be run outside a browser.

In the repository root, you'll find the following scripts. For each script, there's a `.sh` version for Unix and Mac and a `.bat` version for Windows:

* `ci`: Continuous integration automation (not yet).
* `deploy`: Automated deployment to Heroku (not yet).
* `jake`: Build and test automation.
* `watch`: Automatically runs `jake` when any files change. Any arguments are passed through to jake.

For all these scripts, use `-T` to see the available build targets and their documentation. If no target is provided, the script will run `default`. Use `--help` for additional options.

The `jake` script has this additional option:

* `loose=true`: Disable strict browser and version checks.


Download and Setup of the basic automatopia framework
-----------------------------------------------------

To download the setup of this project by James Shore:

1. Install [Git](http://git-scm.com/downloads).
2. Clone the latest code only (to save time): `git clone --depth 1 https://github.com/jamesshore/automatopia.git`
3. Modify `package.json` to use your Node version in the `engines.node` line. (Run `node --version` to determine your Node version.)
4. Delete the `.git` directory so you start fresh
5. Run `git init`, `git add .`, and `git commit -am "Initial commit"` to initialize the git repository.
6. Follow the instructions under "Building and Testing" to make sure everything works.

(Note: You can also download [a zip file of the source code](https://github.com/jamesshore/automatopia/archive/master.zip), but that won't preserve permissions like Git does.)

To customize the project for your needs:

1. Modify `LICENSE.TXT` to contain your copyright and license. 
2. To cause the build to fail unless certain browsers are tested, edit `build/config/tested_browsers.js`. Otherwise, comment those lines out.


Installing, Updating, and Removing npm Packages
-----------------------------------------------

This repository assumes you check your npm modules into git. (Why? [See here.](http://www.letscodejavascript.com/v3/blog/2014/12/the_reliable_build)) Some modules come pre-installed. To update those packages, or install new ones, use the following process to ensure that you don't check in binaries:

1. Install the package without building it: `npm install <package> --ignore-scripts --save-dev` (or `--save` instead of `--save-dev`)
2. Check in the new module: `git add . && git commit -a`
3. Build the package: `npm rebuild`
4. Check for files created by the npm build: `git status`
5. Add any new files from the previous step to the `.gitignore` file and check it in.

To update all npm dependencies at once:

1. Delete the `node_modules` directory.
2. Modify `.gitignore` and remove all references to npm module binaries.
3. Install dependencies without building them: `npm install --ignore-scripts`
4. Check everything in: `git add . && git commit -am "Updated npm dependencies"`
5. Rebuild everything: `npm rebuild`
6. Check for files created by the npm build: `git status`
7. Add any new files from the previous step to the `.gitignore` file and check it in.

If you would rather not check your npm modules into git, you can remove them like this:

1. Delete the node_modules directory.
2. Modify `.gitignore` and replace the references to npm module binaries with `node_modules/`.
3. Modify `build/scripts/run_jake.sh` and `build/scripts/run_jake.bat` to say `npm install` instead of `npm rebuild`.
4. Check everything in: `git add . && git commit -am "Removed node_modules"`.


Building and Testing
--------------------

Before building for the first time:

1. Install [Node.js](http://nodejs.org/download/).
2. Download the project as described above.
3. All commands must run from the root of the source tree.

To build (and test):

1. Run `./jake.sh karma` (Unix/Mac) or `jake karma` (Windows) to start the Karma server.
2. Start the browsers you want to test and point each one at `http://localhost:9876`.
3. Run `./jake.sh` (Unix/Mac) or `jake` (Windows) every time you want to build and test. Alternatively, use `./watch.sh` (Unix/Mac) or `watch` (Windows) to automatically run `jake` whenever files change.

Add the `loose=true` parameter to relax Node and browser version checking.

To run the app for manual testing:

1. Run `./jake.sh run` (Unix/Mac) or `jake run` (Windows).


Continuous Integration
----------------------

See repository root [readme](https://github.com/halcwb/GenUnitApp/blob/master/README.md)


License
-------

GPL License. See `LICENSE.TXT`.