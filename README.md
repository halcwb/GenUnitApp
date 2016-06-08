# GenUnitApp
Web based client server app to calculate with and convert units.

## Build Status

Mono | .NET | Deploy |
---- | ---- | ------ |
[![Mono CI Build Status](https://img.shields.io/travis/halcwb/GenUnitApp/master.svg)](https://travis-ci.org/halcwb/GenUnitApp) | [![.NET Build Status](https://img.shields.io/appveyor/ci/halcwb/GenUnitApp/master.svg)](https://ci.appveyor.com/project/halcwb/GenUnitApp) | [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)|



# Background

# Running local

To run this application locally you can use heroku. First install the [heroku toolbelt](https://toolbelt.heroku.com/) then add a `PATH` variable to the local fsi.exe and run
`heroku local -f Procfile.local`.


# Libray design
This repository uses an explicit opt-in `.gignore` strategy, meaning that all files are excluded unless specifically included via the `.gitignore` file.
