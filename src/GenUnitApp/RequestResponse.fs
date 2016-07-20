namespace GenUnitApp

module RequestResponse =

    open System
    open System.IO
    open System.Text
    open Newtonsoft.Json

    open Suave
    open Suave.Operators

    [<CLIMutable>]
    type Request =
        {
            [<JsonProperty("act")>]
            Action: string
            [<JsonProperty("qry")>]
            Query: obj
        }


    [<CLIMutable>]
    type Response =
        {
            [<JsonProperty("succ")>]
            Success: bool
            [<JsonProperty("info")>]
            Info: string[]
            [<JsonProperty("warn")>]
            Warning: string[]
            [<JsonProperty("errs")>]
            Errors: string[]
            [<JsonProperty("reqs")>]
            Requests: Request[]
        }


    module Query =

        [<CLIMutable>]
        type Evaluate =
            {
                [<JsonProperty("text")>]
                Text : string
            }

