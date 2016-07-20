namespace GenUnitApp


/// Define actions that can be mapped to 
/// the creation of a response
module Actions =

    [<Literal>]
    let ECHO = "echo"

    [<Literal>]
    let EVALUATE = "evaluate"

    [<Literal>]
    let NOACTION = "cannot map this action"

    [<Literal>]
    let GETUNITS = "getunits"

module Query =

    open Newtonsoft.Json

    [<CLIMutable>]
    type Evaluate =
        {
            [<JsonProperty("expr")>]
            Expression : string
        }

module Result =

    open Newtonsoft.Json

    [<CLIMutable>]
    type Evaluate =
        {
            [<JsonProperty("text")>]
            Text : string
        }

    let createEvaluate text = { Text = text }

    [<CLIMutable>]
    type GetUnits = 
        {
            [<JsonProperty("units")>]
            Units : string[]
        }

    let createUnits us = { Units = us |> Array.ofSeq }


/// Mapping a request to a response 
module RequestMapping =

    open Informedica.GenUnits.Lib

    open RequestResponse

    let map (r : Request) : Response =
        printfn "mapping request: %A" r

        let toResponse succ = createResponse succ [||] [||] [||] [||]

        match r.Action with
        | Actions.ECHO     -> 
            toResponse true r
        | Actions.EVALUATE -> 
            (r.Query |> Json.deSerialize<Query.Evaluate>).Expression 
            |> Api.eval
            |> Result.createEvaluate
            |> (toResponse true)
        | Actions.GETUNITS -> 
            GenUnits.Api.getUnits()
            |> Result.createUnits
            |> (toResponse true)
        | _ -> 
            let resp =
                createResponse false [||] [||] [|Actions.NOACTION|] [||] (new obj())
            resp

