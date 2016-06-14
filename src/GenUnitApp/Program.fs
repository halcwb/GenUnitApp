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

    match argv |> List.ofArray with
    | p::_ -> Server.start p
    |  _   -> Server.start ""

    printfn "starting webserver ..."
    
    0
