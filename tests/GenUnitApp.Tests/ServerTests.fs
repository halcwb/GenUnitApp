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
        let request : Json.Request = { Action = ""; Query = new obj() }
        let response : Json.Response = 
            {
                Success = true
                Info = [||]
                Warning = [||]
                Errors = [||]
                Requests = [| request |]
            } 

        let processRequest (r: Json.Request) = response

        let actual = 
            let data = Json.serialize request |> Encoding.UTF8.GetBytes
            runWith defaultConfig (Server.app processRequest)
            |> req HttpMethod.POST "/request" (Some <| new ByteArrayContent(data))

        actual |> should equal (response |> Json.serialize)