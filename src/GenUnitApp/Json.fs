namespace GenUnitApp

module Json =

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


    /// 
    let serialize (o: obj) =
       JsonConvert.SerializeObject(o) 

    
    let deSerialize<'T> (s: string) =
        JsonConvert.DeserializeObject<'T>(s)


    let mapJson f =
        request(fun r ->
            printfn "Processing request:\n%A" (Encoding.UTF8.GetString(r.rawForm))
            f (Encoding.UTF8.GetString(r.rawForm) |> deSerialize)
            |> serialize
            |> Successful.OK
            >=> Writers.setMimeType "application/json")

