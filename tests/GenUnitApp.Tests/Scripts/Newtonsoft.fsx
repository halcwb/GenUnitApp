#r "../../../packages/Newtonsoft.Json/lib/net45/Newtonsoft.Json.dll"

open System
open Newtonsoft.Json


[<CLIMutable>]  
type Request =
    {
        [<JsonProperty("act")>]
        Action: string
        [<JsonProperty("qry")>]
        Query: obj
    }



let toString (o: obj) =
   JsonConvert.SerializeObject(o) 

{ Action = "Test"; Query = new Object() }
|> toString
|> printfn "%s"

let fromString<'T> (s: string) =
    JsonConvert.DeserializeObject<'T>(s)

{ Action = "Test"; Query = new Object() }
|> toString
|> fromString<Request>
|> printfn "%A"
