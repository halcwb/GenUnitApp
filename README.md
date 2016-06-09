# GenUnitApp
Web based client server app to calculate with and convert units.

## Build Status

Mono | .NET | Heroku | Azure |
---- | ---- | ------ | ----- |
[![Mono CI Build Status](https://img.shields.io/travis/halcwb/GenUnitApp/master.svg)](https://travis-ci.org/halcwb/GenUnitApp) | [![.NET Build Status](https://img.shields.io/appveyor/ci/halcwb/GenUnitApp/master.svg)](https://ci.appveyor.com/project/halcwb/GenUnitApp) | [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)| [![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)|

This app aims to build both on mono and .net and to be deployable to Heroku and Azure

Deployment to Azure is working. Deployment to Heroku works locally, but due to mono version issue that causes resolving dependent libs not in the GAC not being found, it doesn't work on Heroku remote yet.

# Background
Application that can parse string expressions like: </br>

`200 mg[Mass]/ml[Volume] * 2 ml[Volume]` </br>

Giving the right answer `400 mg[Mass]`.

More comming...

# Running local

To run this application locally you can use heroku. First install the [heroku toolbelt](https://toolbelt.heroku.com/) then add a `PATH` variable to the local fsi.exe and run
`heroku local -f Procfile.local`. (deployment is not working yet as mentionned above).

This app is also deployable to [Azure](https://genunitapp.azurewebsites.net/).


# Libray design
This repository uses an explicit opt-in `.gignore` strategy, meaning that all files are excluded unless specifically included via the `.gitignore` file.
