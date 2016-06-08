//---------------------------------------------------------------------
#load "load-project-release.fsx"
open System
open Suave // always open suave
open Suave.Successful
open Suave.Http
open Suave.Web // for config

printfn "initializing script..."

let config =
    let port = System.Environment.GetEnvironmentVariable("PORT")
    { defaultConfig with
        logger = Logging.Loggers.saneDefaultsFor Logging.LogLevel.Verbose
        bindings = [ (if port = null then HttpBinding.mkSimple HTTP "127.0.0.1" 3000
                      else HttpBinding.mkSimple HTTP "0.0.0.0" (int32 port)) ] }

printfn "starting webserver ..."

let app = OK "Hello World!"

startWebServer config app
