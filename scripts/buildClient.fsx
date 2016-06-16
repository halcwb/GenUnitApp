#I "../packages/FAKE/tools/"

#r @"FakeLib.dll"

open System
open System.IO

open Fake
open Fake.NpmHelper

let dir = (new DirectoryInfo(__SOURCE_DIRECTORY__)).Parent.FullName
Environment.CurrentDirectory <- dir
    
printfn "%s" Environment.CurrentDirectory

let clientPath = "./client"

let buildClient () =
    let npmFilePath = environVarOrDefault "NPM_FILE_PATH" defaultNpmParams.NpmFilePath

    Npm <| fun p ->
        { p with
            Command = Install Standard
            WorkingDirectory = clientPath
            NpmFilePath = npmFilePath }


Target "BuildClient" <| fun _ ->
    let npmFilePath = environVarOrDefault "NPM_FILE_PATH" defaultNpmParams.NpmFilePath
    buildClient ()
    

Target "ClientTests" <| fun _ ->
    let npmFilePath = environVarOrDefault "NPM_FILE_PATH" defaultNpmParams.NpmFilePath
    
    Npm <| fun p ->
        { p with
            Command = Run "jake-tests"
            WorkingDirectory = clientPath 
            NpmFilePath = npmFilePath }


