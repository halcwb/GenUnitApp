namespace GenUnitApp

/// Request Response abstraction. 
module RequestResponse =

    open System
    open System.IO
    open System.Text
    open Newtonsoft.Json

    open Suave
    open Suave.Operators

    open Informedica.GenUnits.Lib

        

    /// Represents a `Request` with
    [<CLIMutable>]
    type Request =
        {
            /// Action that uses the query
            [<JsonProperty("act")>]
            Action: string
            /// Query string that is the json
            /// representation of a query object
            [<JsonProperty("qry")>]
            Query: string
        }


    /// Represents a `Response`
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


    module Result =

        [<CLIMutable>]
        type Evaluate =
            {
                [<JsonProperty("text")>]
                Text : string
            }

        let createEvaluate text = { Text = text }


