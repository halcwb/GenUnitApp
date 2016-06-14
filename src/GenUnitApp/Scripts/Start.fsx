//---------------------------------------------------------------------
// Script that starts a deployment demo webserver
//---------------------------------------------------------------------
#load "load-project-release.fsx"

open System

open GenUnitApp

Environment.GetEnvironmentVariable("PORT") |> Server.start
