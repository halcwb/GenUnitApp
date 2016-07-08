#load "load-references.fsx"

open GenUnitApp

open NUnit.Framework
open FsUnit

open Suave
open Suave.Http
open Suave.Testing


module ServerTests =

    [<Test>]
    let ``app routing should return nothing there with default config when get hello`` () =
        let response =
            runWith defaultConfig Server.app
            |> req HttpMethod.POST "/hello" None
        response |> should equal ""

