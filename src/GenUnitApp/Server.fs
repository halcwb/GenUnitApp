﻿namespace GenUnitApp

module Server =

    open System
    open System.IO
    open System.Net

    open Suave // always open suave
    open Suave.Http
    open Suave.Files
    open Suave.Operators
    open Suave.Filters
    open Suave.Successful
    open Suave.RequestErrors
    open Suave.Web // for config
    open Suave.Sockets
    open Suave.Sockets.Control
    open Suave.WebSocket
    open Suave.Utils

    open Informedica.GenUtils.Lib.BCL
    open Informedica.GenUnits.Lib

    let echo (ws : WebSocket) =
        fun cx -> socket {
            let loop = ref true
            while !loop do
                let! msg = ws.read();
                match msg with
                | (Text, data, true) ->
                    let str = UTF8.toString data
                    printfn "****** Received: %s" str
                    do! ws.send Text data true
                | (Ping, _, _) ->
                    do! ws.send Pong [||] true
                | (Close, _, _) ->
                    do! ws.send Close [||] true
                    loop := false
                | _ -> ()
        }

    let start home port =
        let clientDir =
            @"client\generated\dist"
            |> String.replace "\\" (string Path.DirectorySeparatorChar)

        let home = Path.Combine(home, clientDir)
        printfn "Starting server on: %s with home: %s" port home

        let msg =
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
                [
                    path "/echo" >=> handShake echo
                    GET >=> choose
                        [
                            // Just to avoid an error in chrome
                            path "/favicon.ico" >=> OK ""
                            // Little server alive check
                            path "/hello" >=> OK "World?"
                            // Start with the index file
                            path "/" >=> Files.browseFileHome "index.html"
                            // Get all other files
                            Files.browseHome
                        ]
                    POST >=> choose
                        [
                            path "/msg" >=> OK msg
                        ]
                    NOT_FOUND "Sorry there is nothing there"
                ]

        startWebServer config app
