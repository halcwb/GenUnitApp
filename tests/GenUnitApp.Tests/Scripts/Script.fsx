#load "load-references-release.fsx"

#time

open System
open System.Net.Http
open System.IO
open System.Text
open System.Runtime.Serialization
open System.Runtime.Serialization.Json

open GenUnitApp
open GenUnitApp.Utils

open NUnit.Framework
open FsUnit

open Suave
open Suave.Http
open Suave.Testing


[<DataContract(Name="request")>]
[<CLIMutable>]
type Request =
    {
        [<field: DataMember(Name = "act")>]
        Action: string
        [<field: DataMember(Name = "qry")>]
        Query: obj
    }


[<DataContract(Name="response")>]
[<CLIMutable>]
type Response =
    {
        [<field: DataMember(Name = "succ")>]
        Success: bool
        [<field: DataMember(Name = "info")>]
        Info: string[]
        [<field: DataMember(Name = "warn")>]
        Warning: string[]
        [<field: DataMember(Name = "errs")>]
        Errors: string[]
        [<field: DataMember(Name = "reqs")>]
        Requests: Request[]
    }


[<Literal>]
let indexHtml = "index.html"

let testapp = Server.app (fun _ -> ())


[<Test>]
let ``app routing should return GenUnitApp when get hello`` () =
    let response =
        runWith defaultConfig testapp
        |> req HttpMethod.GET "/hello" None
    response |> should equal "GenUnitApp"

[<Test>]
let ``app routing should return nothing there when get foo`` () =
    let response =
        runWith defaultConfig testapp
        |> req HttpMethod.GET "/foo" None
    response |> should equal Server.NOT_FOUND_RESPONSE


[<Test>]
let ``app routing should return index file when get root`` () =
    let home = 
        AppDomain.CurrentDomain.BaseDirectory
        |> Path.parentDirectory
        |> Path.parentDirectory
        |> Path.combineWith "data"
    //        home |> should equal ""

    let config = {
            defaultConfig
            with homeFolder = home |> Some
        }
    let response = 
        runWith config testapp
        |> req HttpMethod.GET "/" None

    response |> should equal indexHtml


[<Test>]
let ``can post a request and get a response`` () =
    let request  = { Action = ""; Query = new obj() }
    let response = 
        {
            Success = true
            Info = [||]
            Warning = [||]
            Errors = [||]
            Requests = [||]
        } 

    let processRequest _ = response |> toJson

    let actual = 
        let dcs = DataContractJsonSerializer(response.GetType())
        use ms = new MemoryStream()
        ms.Position <- 0L
        runWith defaultConfig (Server.app processRequest)
        |> req HttpMethod.POST "/request" (Some <| new ByteArrayContent(Json.toJson request))
        |> fromJson<Response>

    actual |> should equal response