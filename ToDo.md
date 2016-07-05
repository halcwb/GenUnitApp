GenUnitApp Calculate with units and perform unit conversions
============================================================

Minimum Marketing Features:
---------------------------
- ~~marketing home page~~
  - ~~show initial html~~
  - ~~show GenUnit result~~

User Stories:
-------------
- ~~enter a string expression and let the app calculate the expression~~
- enter a digit and unit string expression, return a list of available
conversions (units) and let the user pick a conversion

Engineering Tasks:
------------------
- Clean up root of repository
- Update documentation and add javascript docs
- ~~Make sure that both windows and max os x/linux use the same node version~~
- ~~Server:~~
    - ~~Build~~
        - ~~FAKE:~~
            - ~~build server~~
            - ~~test server~~
            - ~~create docs~~
            - ~~release docs~~
            - ~~release solution~~
            - ~~integrate~~
            - add watch and then trigger run script
    - ~~Tests~~
        - ~~FsCheck~~
        - ~~NUnit (version >= 3)~~
        - ~~FsUnit~~
        - ~~Unquote~~
        - ~~Fuchu~~
    - ~~Release~~
        - ~~on git~~
    - update code documentation
- Client:
    - Build
        - diff between --save and --save-dev
        - Jake:
            - ~~use Karma for cross browser testing~~
            - ~~use nodemon to automate bundling and testing~~
            - ~~bundle with Browserify~~
            - ~~static code analysis (Lint)~~
            - ~~setup webix to use on client side~~
            - create documentation
- ~~Continuous Integration~~
    - ~~Travis runs server tests~~
    - ~~Appveyor runs server tests~~
    - ~~Travis runs clienttests~~
    - ~~Appveyor runs clienttests~~
- Deploy
    - Using Docker (see suave book)
    - setup Heroku not working yet
    - setup Azure not working yet (could do by ftp bin?)
    - automate deploy via master working for azure
