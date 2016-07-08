module Program

open System
open System.IO

open Suave // always open suave
open Suave.Successful
open Suave.Http
open Suave.Web // for config

open Informedica.GenUtils.Lib.BCL
open GenUnitApp
open GenUnitApp.Utils.Path

let iif x1 x2 = if x1 |> String.IsNullOrEmpty |> not then x1 else x2

    
/// Main entry point of the GenUnitApp
/// takes as argument the port on which
/// the app will listen. If no port is provided
/// the default will be 3000.
[<EntryPoint>]
let main argv =
    
    printfn "initializing script..."

    // ToDo: Not sure if not just Environment.CurrentDirectory
    let home =
        if AppDomain.CurrentDomain.BaseDirectory |> combineWith "client" |> dirExists then
            AppDomain.CurrentDomain.BaseDirectory
        else
        Environment.CurrentDirectory
        |> parentDirectory

    match argv |> List.ofArray with
    | p::_ -> Server.start home p
    |  _   -> Server.start home ""

    printfn "starting webserver ..."
    
    0
