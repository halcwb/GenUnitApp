module Program

open System
open Suave // always open suave
open Suave.Successful
open Suave.Http
open Suave.Web // for config

open Informedica.GenUtils.Lib.BCL
open GenUnitApp

let iif x1 x2 = if x1 |> String.IsNullOrEmpty |> not then x1 else x2
    

[<EntryPoint>]
let main argv =
    
    printfn "initializing script..."

    let home = 
        iif AppDomain.CurrentDomain.RelativeSearchPath 
            AppDomain.CurrentDomain.BaseDirectory 
        |> iif Environment.CurrentDirectory

    match argv |> List.ofArray with
    | p::_ -> Server.start home p
    |  _   -> Server.start home ""

    printfn "starting webserver ..."
    
    0
