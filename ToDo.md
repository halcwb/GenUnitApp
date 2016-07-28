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
- ~~enter a digit and unit string expression, return a list of available
conversions (units) and let the user pick a conversion~~
- ~~add result of evaluation or conversion to list~~
- add info, warning and error messages to status bar
- give help info when invalid input (validation)

Engineering Tasks:
------------------
- ~~Clean up root of repository~~
- ~~Update readme and add link to this doc~~
- Update code documentation and add javascript docs
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
        - ~~diff between --save and --save-dev~~
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
      - ~~Copy binaries and client dir to bin~~
      - ~~Check running from bin is working~~
      - ~~Ftp bin to azure/site/wwwroot directory~~
      - Automate deploy to azure (maybe use: http://help.appveyor.com/discussions/questions/964-deploy-static-site-to-azure-website)

Current Taks:
-------------
- ~~Try to hide console error when no development refresh server~~ isn not going to work
see (http://forum.webix.com/discussion/7230/suppress-ajax-error-in-console#latest)
- Give better description when invalid expression input
- ~~Implement server side request response abstraction~~
- Create tests for client and server
- Refactor
  - client extract query objects
  - ~~abstract creating request objects~~
