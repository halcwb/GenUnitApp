module Program

open System
open Suave // always open suave
open Suave.Successful
open Suave.Http
open Suave.Web // for config

open GenUnitApp


[<EntryPoint>]
let main argv =
    
    printfn "initializing script..."

    let home = AppDomain.CurrentDomain.RelativeSearchPath

    match argv |> List.ofArray with
    | p::_ -> Server.start home p
    |  _   -> Server.start home ""

    printfn "starting webserver ..."
    
    0
