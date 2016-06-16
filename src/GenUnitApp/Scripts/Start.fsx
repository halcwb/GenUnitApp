//---------------------------------------------------------------------
// Script that starts a deployment demo webserver
//---------------------------------------------------------------------
#load "load-project-release.fsx"

open System
open System.IO

open GenUnitApp

let start () = 
    Environment.CurrentDirectory <- __SOURCE_DIRECTORY__

    let home = 
        Path.Combine(Environment.CurrentDirectory, @"..\..\..\")
        |> Directory.GetParent
        |> (fun i -> i.FullName)


    Environment.GetEnvironmentVariable("PORT") |> Server.start home
