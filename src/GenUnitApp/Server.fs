namespace GenUnitApp

module Server =

    open System
    open System.IO

    open Suave // always open suave
    open Suave.Operators
    open Suave.Filters
    open Suave.Successful
    open Suave.Web // for config

    open Informedica.GenUnits.Lib

    let start home port =
        printfn "Starting server on: %s with home: %s" port home

        let msg = //"Hello"
            let eq = "200 mg[Mass]/ml[Volume] * 2 ml[Volume]/hour[Time]"
            let rs = eq |> Api.eval
            sprintf "<b>This is the GenUnitApp!</b></br></br>" +
            sprintf "This applicaton can calculate this expression:</br> %s = %s" eq rs

        let config =
            { defaultConfig with
                logger = Logging.Loggers.saneDefaultsFor Logging.LogLevel.Verbose
                bindings = [ (if port |> String.IsNullOrEmpty then 
                                HttpBinding.mkSimple HTTP "127.0.0.1" 3000
                              else HttpBinding.mkSimple HTTP "0.0.0.0" (int32 port)) ]
                homeFolder = home |> Some }
        
        let app = 
            choose 
                [ GET >=> choose [
                        path "/" >=> Files.browseFileHome "/client/generated/dist/index.html"
                        Files.browseHome ] ]       

        startWebServer config app
        
    

