module Program

open System
open Suave // always open suave
open Suave.Successful
open Suave.Http
open Suave.Web // for config

open Informedica.GenUnits.Lib


[<EntryPoint>]
let main argv =
    
    printfn "initializing script..."

    let msg = //"Hello"
        let eq = "200 mg[Mass]/ml[Volume] * 2 ml[Volume]/hour[Time]"
        let rs = eq |> Api.eval
        sprintf "<b>This is the GenUnitApp!</b></br></br>" +
        sprintf "This applicaton can calculate this expression:</br> %s = %s" eq rs

    let config =
        let port = System.Environment.GetEnvironmentVariable("PORT")
        { defaultConfig with
            logger = Logging.Loggers.saneDefaultsFor Logging.LogLevel.Verbose
            bindings = [ (if port = null then HttpBinding.mkSimple HTTP "127.0.0.1" 3000
                          else HttpBinding.mkSimple HTTP "0.0.0.0" (int32 port)) ] }

    printfn "starting webserver ..."

    let app = OK msg

    startWebServer config app
    
    0
