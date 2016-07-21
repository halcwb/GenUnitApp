namespace GenUnitApp.Tests



module ServerTests =

    open System
    open System.Text
    open System.Net.Http

    open GenUnitApp
    open GenUnitApp.Utils

    open NUnit.Framework
    open FsUnit

    open Suave
    open Suave.Http
    open Suave.Testing

    open Newtonsoft.Json

    module RR = GenUnitApp.RequestResponse
    module QR = GenUnitApp.Query
            
    [<Literal>]
    let indexHtml = "index.html"

    let testapp = Server.app (fun _ -> ())

    type Query1 = { content : string }
    type Query2 = { content : string }

    let createRequest a q : RR.Request = { Action = a; Query = q }
    let createResponse s i w e rs : RR.Response = 
        {
            Success = s
            Info = i
            Warning = w
            Errors = e
            Requests = rs
            Result = new obj()
        } 
    let crResp s r = createResponse s [||] [||] [||] [|r|]


    [<Literal>]
    let ACT1 = "act1"
    [<Literal>]
    let ACT2 = "act2"


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
        let request : RR.Request = { Action = ""; Query = "" }
        let response : RR.Response = 
            {
                Success = true
                Info = [||]
                Warning = [||]
                Errors = [||]
                Requests = [| request |]
                Result = new obj()
            } 

        let processRequest (r: RR.Request) = response

        let actual = 
            let data = Json.serialize request |> Encoding.UTF8.GetBytes
            runWith defaultConfig (Server.app processRequest)
            |> req HttpMethod.POST "/request" (Some <| new ByteArrayContent(data))

        actual |> should equal (response |> Json.serialize)


    [<Test>]
    let ``can map a request to a response`` () =
        let req1 = createRequest "act1" ({ Query1.content = "query1"} |> Json.serialize)
        let req2 = createRequest "act2" ({ Query2.content = "query2"} |> Json.serialize)
        let req3 = createRequest "act3" ""

        let resp1 = crResp true req1
        let resp2 = crResp true req2
        let resp3 = crResp false req3

        let mapRequest (r: RR.Request) =
            match r.Action with
            | ACT1 -> crResp true r
            | ACT2 -> crResp true r
            | _ -> crResp false r

        let act1 =
            let data =
                new ByteArrayContent( 
                    Json.serialize req1 
                    |> Encoding.UTF8.GetBytes)
                |> Some

            runWith defaultConfig (Server.app mapRequest)
            |> req HttpMethod.POST "/request" data 
        
        act1 |> should equal (resp1 |> Json.serialize)

        let act2 =
            let data =
                new ByteArrayContent( 
                    Json.serialize req2 
                    |> Encoding.UTF8.GetBytes)
                |> Some

            runWith defaultConfig (Server.app mapRequest)
            |> req HttpMethod.POST "/request" data 
        
        act2 |> should equal (resp2 |> Json.serialize)

        let act3 =
            let data =
                new ByteArrayContent( 
                    Json.serialize req3 
                    |> Encoding.UTF8.GetBytes)
                |> Some

            runWith defaultConfig (Server.app mapRequest)
            |> req HttpMethod.POST "/request" data 
        
        act3 |> should equal (resp3 |> Json.serialize)
        
    [<Test>]
    let ``can get units for a group`` () =
        let resp = 
            GenUnits.Api.getUnits ""
            |> GenUnitApp.Result.createUnits
            |> (fun us -> 
                {
                    RR.Response.Success = true
                    RR.Response.Info = [||]
                    RR.Response.Warning = [||]
                    RR.Response.Errors = [||]
                    RR.Response.Requests = [||]
                    RR.Response.Result = us
                }             
            )
            |> Json.serialize

        let qry = { QR.GetUnits.Group = "" }
        let data = 
            createRequest "getunits" (qry |> Json.serialize)
            |> Json.serialize
            |> Encoding.UTF8.GetBytes

        let act =
            runWith defaultConfig (Server.app RequestMapping.map)
            |> req HttpMethod.POST "/request" (new ByteArrayContent(data) |> Some)
        
        act |> should equal resp