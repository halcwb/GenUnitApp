namespace GenUnitApp

/// Request Response abstraction with a 
module RequestResponse =

    open System
    open System.IO
    open System.Text
    open Newtonsoft.Json

    open Suave
    open Suave.Operators

    open Informedica.GenUnits.Lib


    [<CLIMutable>]
    type Request =
        {
            [<JsonProperty("act")>]
            Action: string
            [<JsonProperty("qry")>]
            Query: string
        }


    [<CLIMutable>]
    type Response =
        {
            [<JsonProperty("succ")>]
            Success : bool
            [<JsonProperty("info")>]
            Info : string[]
            [<JsonProperty("warn")>]
            Warning : string[]
            [<JsonProperty("errs")>]
            Errors : string[]
            [<JsonProperty("reqs")>]
            Requests : Request[]
            [<JsonProperty("result")>]
            Result : obj 
        }


    let createResponse succ info warn errs reqs res =
        {
            Success = succ
            Info = info
            Warning = warn
            Errors = errs
            Requests = reqs
            Result = res
        }


    module Actions =

        [<Literal>]
        let EVALUATE = "evaluate"


    module Query =

        [<CLIMutable>]
        type Evaluate =
            {
                [<JsonProperty("expr")>]
                Expression : string
            }


    module Result =

        [<CLIMutable>]
        type Evaluate =
            {
                [<JsonProperty("text")>]
                Text : string
            }

        let createEvaluate text = { Text = text }


module RequestMapping =

    open Informedica.GenUnits.Lib

    open RequestResponse

    let map (r : Request) : Response =
        printfn "mapping request: %A" r
        match r.Action with
        | Actions.EVALUATE -> 
            (r.Query |> Json.deSerialize<Query.Evaluate>).Expression 
            |> Api.eval
            |> Result.createEvaluate
            |> (fun r -> createResponse true [||] [||] [||] [||] r)
        | _ -> 
            let resp =
                createResponse true [||] [||] [||] [||] (new obj())
            resp

