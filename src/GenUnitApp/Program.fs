module Program

open System
open System.IO

open Suave // always open suave
open Suave.Successful
open Suave.Http
open Suave.Web // for config

open Informedica.GenUtils.Lib.BCL
open GenUnitApp

let iif x1 x2 = if x1 |> String.IsNullOrEmpty |> not then x1 else x2

/// combine path `p1` with `p2`
let combineWith p2 p1 = Path.Combine(p1, p2)

/// Create a `DirectoryInfo` from `p` 
let dir p = new DirectoryInfo(p)

/// Check whether directory `p` exists
let dirExists p =
    let d = (new DirectoryInfo(p))
    d.Exists

/// Get the parent directory from `p`
let parentDirectory p = 
    let d = (new DirectoryInfo(p))
    d.Parent.FullName
    
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
