#I __SOURCE_DIRECTORY__
#r "System.dll"
#r "System.Net.Http.dll"
#r "System.Runtime.Serialization"

open System
open System.Net.Http
open System.IO
open System.Text
open System.Runtime.Serialization
open System.Runtime.Serialization.Json


[<DataContract(Name="request")>]
[<CLIMutable>]
type Request =
    {
        [<field: DataMember(Name = "act")>]
        Action: string
        [<field: DataMember(Name = "qry")>]
        Query: obj
    }


let fromJson<'T> (json: string) =
    let dcs = DataContractJsonSerializer(typeof<'T>)
    use ms = new MemoryStream(ASCIIEncoding.ASCII.GetBytes(json))
    (new StreamWriter(ms)).Write(json)
    dcs.ReadObject(ms) :?> 'T

let toJson o =
    let dcs = DataContractJsonSerializer(o.GetType())
    use ms = new MemoryStream()
    dcs.WriteObject(ms, o) 
    ms.Position <- 0L
    (new StreamReader(ms)).ReadToEnd()


{ Action = "Test"; Query = new Object() }
|> toJson
|> printfn "%s"

