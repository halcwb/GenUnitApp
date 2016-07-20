namespace GenUnitApp

module Server =

    open System
    open System.IO
    open System.Net

    open Suave // always open suave
    open Suave.Http
    open Suave.Files
    open Suave.Operators
    open Suave.Filters
    open Suave.Writers
    open Suave.Successful
    open Suave.RequestErrors
    open Suave.Web // for config
    open Suave.Sockets
    open Suave.Sockets.Control
    open Suave.WebSocket
    open Suave.Utils

    open Informedica.GenUtils.Lib.BCL
    open Informedica.GenUnits.Lib

    open RequestResponse

    /// Utility to get the last element 
    /// in a list
    let rec listLast (list: 'T list) =
        match list with
        | [x] -> x
        | _::tail -> listLast tail
        | [] -> failwith "Empty list"


    [<Literal>]
    let NOT_FOUND_RESPONSE = "Sorry, there is nothing there"

    /// Utility function to set the headers to allow
    /// cross origin requests 
    let setCORSHeaders =
        setHeader "Access-Control-Allow-Origin" "*"
        >=> setHeader "Access-Control-Allow-Headers" "content-type"


    let msg =
        let eq = "200 mg[Mass]/ml[Volume] * 2 ml[Volume]/hour[Time]"
        let rs = eq |> Api.eval
        sprintf "<b>This is the GenUnitApp!</b></br></br>" +
        sprintf "This applicaton can calculate this expression:</br> %s = %s" eq rs


    let evaluate ctx = 
        asyncOption {
            printfn "Received evaluate post: %A" (ctx.request.rawForm |> UTF8.toString |> Uri.UnescapeDataString)

            let res = 
                ctx.request.rawForm
                |> UTF8.toString
                |> String.split "="
                |> listLast
                |> Uri.UnescapeDataString
                |> Api.eval

            return { ctx with response = 
                              { ctx.response with content = res |> UTF8.bytes |> Bytes
                                                  status = HTTP_201 }
            }
        } 

    /// Get the server configuration with
    /// home folder `home` and port `port`.
    let getConfig home port =
        { defaultConfig with
            logger = Logging.Loggers.saneDefaultsFor Logging.LogLevel.Verbose
            bindings = [ (if port |> String.IsNullOrEmpty then
                            HttpBinding.mkSimple HTTP "127.0.0.1" 3000
                          else HttpBinding.mkSimple HTTP "0.0.0.0" (int32 port)) ]
            homeFolder = home |> Some }


    /// Create the server app with a function
    /// that processes request posts.
    let app processRequest =
        choose
            [
                GET >=> choose
                    [
                        // Just to avoid an error in chrome
                        path "/favicon.ico" >=> OK ""
                        // Little server alive check
                        path "/hello" >=> OK "GenUnitApp"
                        // Start with the index file
                        path "/" >=> Files.browseFileHome "index.html"
                        // Get all other files
                        Files.browseHome
                    ]
                POST >=> choose
                    [
                        path "/msg" >=> OK msg
                        path "/eval" >=> evaluate
                        path "/request" >=> fun context -> 
                            context |> (setCORSHeaders >=> (GenUnitApp.Json.mapJson processRequest))
                    ]
                NOT_FOUND NOT_FOUND_RESPONSE
            ]


    /// Start the GenUnitApp with home `home` and 
    /// port `port`.
    let start home port =

        let procReq (r: Request) : Response =
            printfn "Received request:\n %A" r 
            { 
                Success = true
                Info = [||]
                Warning = [||]
                Errors = [||]
                Requests = [|r|]
            }

        // ToDo refactor this
        let clientDir =
            @"client\generated\dist"
            |> String.replace "\\" (string Path.DirectorySeparatorChar)

        let home = Path.Combine(home, clientDir)

        printfn "Starting server on: %s with home: %s" port home
        startWebServer (getConfig home port) (app procReq)
