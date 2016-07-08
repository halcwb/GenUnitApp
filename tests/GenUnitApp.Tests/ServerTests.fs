namespace GenUnitApp.Tests

module ServerTests =

    open GenUnitApp

    open NUnit.Framework
    open FsUnit

    open Suave
    open Suave.Http
    open Suave.Testing


    [<Test>]
    let ``app routing should return GenUnitApp when get hello`` () =
        let response =
            runWith defaultConfig Server.app
            |> req HttpMethod.GET "/hello" None
        response |> should equal "GenUnitApp"

    [<Test>]
    let ``app routing should return nothing there when get foo`` () =
        let response =
            runWith defaultConfig Server.app
            |> req HttpMethod.GET "/foo" None
        response |> should equal Server.NOT_FOUND_RESPONSE
