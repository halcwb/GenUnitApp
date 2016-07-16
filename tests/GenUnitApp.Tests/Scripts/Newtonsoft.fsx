#I __SOURCE_DIRECTORY__
#load "load-project-release.fsx"

open System
open System.Net.Http
open System.IO
open System.Text
open System.Runtime.Serialization.Json
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

let toJson o =
    use ms = new MemoryStream()
    use bw = new Bson.BsonWriter(ms)
    let ser = new JsonSerializer()
    ser.Serialize(bw, o)
    ms.Position <- 0L
    ms.ToArray()

let fromJson<'T> (data: byte[]) =
    use ms = new MemoryStream(data)
    use br = new Bson.BsonReader(ms)
    let ser = new JsonSerializer()
    ser.Deserialize<'T>(br)

{ Action = "Test"; Query = new obj() }
|> toJson
|> fromJson<Request>
|> printfn "%A"

/// Expose function f through a json call where you decide
/// which serializer to use.
let mapJsonWith<'TIn, 'TOut> (deserializer:byte[] -> 'TIn) (serializer:'TOut->byte[]) f =
    request(fun r ->
        f (deserializer r.rawForm)
        |> serializer
        |> Successful.ok
        >=> Writers.setMimeType "application/json")

let mapJson2 f =
    request(fun r ->
        f (Encoding.UTF8.GetString(r.rawForm) |> fromString)
        |> toString
        |> Successful.OK
        >=> Writers.setMimeType "application/json")

let mapJson<'TIn, 'TOut> = mapJsonWith<'TIn, 'TOut> fromJson toJson 

let app f = 
    Filters.POST >=> choose [
            Filters.path "/request" >=> mapJson f
        ]

let app2 f = 
    Filters.POST >=> choose [
            Filters.path "/request" >=> mapJson2 f
        ]


Suave.Testing.runWith defaultConfig (app <| fun (js: Request) -> js)
|> Suave.Testing.req HttpMethod.POST "/request" (Some <| new ByteArrayContent({ Action = "Test"; Query = new Object() } |> toJson))


Suave.Testing.runWith defaultConfig (app2 <| fun (js: Request) -> js)
|> Suave.Testing.req HttpMethod.POST "/request" (Some <| new ByteArrayContent({ Action = "Test"; Query = new Object() } |> toString |> Encoding.UTF8.GetBytes))
