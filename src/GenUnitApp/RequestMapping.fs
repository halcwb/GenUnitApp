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

    [<Literal>]
    let CONVERT = "convert"


module Query =

    open Newtonsoft.Json

    [<CLIMutable>]
    type Evaluate =
        {
            [<JsonProperty("expr")>]
            Expression : string
        }

    [<CLIMutable>]
    type GetUnits =
        {
            [<JsonProperty("grp")>]
            Group : string
        }

    [<CLIMutable>]
    type Convert =
        {
            [<JsonProperty("value")>]
            Value : string
            [<JsonProperty("fromUnit")>]
            FromUnit : string
            [<JsonProperty("toUnit")>]
            ToUnit : string
        }

module Result =

    open Newtonsoft.Json

    [<CLIMutable>]
    type Evaluate =
        {
            [<JsonProperty("text")>]
            Text : string
        }

    let createEvaluate text : Evaluate = { Text = text }

    [<CLIMutable>]
    type GetUnits = 
        {
            [<JsonProperty("units")>]
            Units : string[]
        }

    let createUnits us = { Units = us |> Array.ofSeq }

    [<CLIMutable>]
    type Convert = 
        {
            [<JsonProperty("text")>]
            Text : string
        }

    let createConvert txt : Convert = { Text = txt }


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

        | Actions.CONVERT -> 
            let conv = (r.Query |> Json.deSerialize<Query.Convert>)
            let value = conv.Value + " " + conv.FromUnit
            let toUnit = conv.ToUnit 
            value |> Api.convert toUnit
            |> Result.createConvert
            |> (toResponse true)

        | Actions.GETUNITS ->
            (r.Query |> Json.deSerialize<Query.GetUnits>).Group 
            |> GenUnits.Api.getUnits
            |> Result.createUnits
            |> (toResponse true)

        | _ -> 
            let resp =
                createResponse false [||] [||] [|Actions.NOACTION|] [||] (new obj())
            resp

