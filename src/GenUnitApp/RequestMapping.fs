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


module Query =

    open Newtonsoft.Json

    [<CLIMutable>]
    type Evaluate =
        {
            [<JsonProperty("expr")>]
            Expression : string
        }


/// Mapping a request to a response 
/// 
module RequestMapping =

    open Informedica.GenUnits.Lib

    open RequestResponse

    let map (r : Request) : Response =
        printfn "mapping request: %A" r
        match r.Action with
        | Actions.ECHO     -> 
            createResponse true [||] [||] [||] [||] r
        | Actions.EVALUATE -> 
            (r.Query |> Json.deSerialize<Query.Evaluate>).Expression 
            |> Api.eval
            |> Result.createEvaluate
            |> (createResponse true [||] [||] [||] [||])
        | _ -> 
            let resp =
                createResponse false [||] [||] [|Actions.NOACTION|] [||] (new obj())
            resp

