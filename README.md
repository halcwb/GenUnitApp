# GenUnitApp
Web based client server app to calculate with and convert units.

## Build Status

Mono | .NET | Heroku | Azure |
---- | ---- | ------ | ----- |
[![Mono CI Build Status](https://img.shields.io/travis/halcwb/GenUnitApp/master.svg)](https://travis-ci.org/halcwb/GenUnitApp) | [![.NET Build Status](https://img.shields.io/appveyor/ci/halcwb/GenUnitApp/master.svg)](https://ci.appveyor.com/project/halcwb/GenUnitApp) | [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)| [![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)|

This app aims to build both on mono and .net and to be deployable to Heroku and Azure

Deployment to Azure is working. Deployment to Heroku works locally, but due to mono version issue that causes resolving dependent libs not in the GAC not being found, it doesn't work on Heroku remote yet.

## Background
Application that can parse string expressions like: </br>

`200 mg[Mass]/ml[Volume] * 2 ml[Volume]` </br>

Giving the right answer `400 mg[Mass]`.

More coming...

## Build

To build the app use `.\build.sh build` or `build.cmd build`. Except for
`node.js` there are no other dependencies.

### Node.js
The client build requires that `node.js` is installed. The current release
is tested for version 6.2.2. It probably runs well on older releases. To
install node `.\node_install.sh 6.2.2` can be used. To uninstall an older
version first, `.\node_remove.sh` can be use. On windows, the 'normal'
node installer can be used.

## Running local

To run this application locally you can use heroku. First install the [heroku toolbelt](https://toolbelt.heroku.com/) then add a `PATH` variable to the local fsi.exe and run
`heroku local -f Procfile.local`. (deployment is not working yet as mentionned above).

This app is also deployable to [Azure](https://genunitapp.azurewebsites.net/).


## Libray design
This repository uses an explicit opt-in `.gignore` strategy, meaning that all files are excluded unless specifically included via the `.gitignore` file.


## Collaborate
To facilitate collaboration commits will be made readable by prepending
commit messages with:

- feat: new feature
- fix: fix a bug or problem
- docs: document
- refactor: refactoring
- perf: improve performance
- test: add test
- chore: do a chore (build, libs, etc..)
