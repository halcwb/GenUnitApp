#I "../packages/FAKE/tools/"

#r @"FakeLib.dll"

open System
open System.IO

open Fake
open Fake.ProcessHelper
open Fake.StringHelper

let dir = (new DirectoryInfo(__SOURCE_DIRECTORY__)).Parent.FullName

let workDir = Path.Combine(dir, "client")

Environment.CurrentDirectory <- workDir

let jakePath =
    match isUnix with
    | false -> Path.Combine(workDir, "jake.cmd")
    | true  -> Path.Combine(workDir, "jake.sh")

let runtests = "default"
let build    = "build"

let runClient arg =
    let res =
        ExecProcessAndReturnMessages (fun info ->
            info.FileName <- jakePath
            info.Arguments <- arg
            info.WorkingDirectory <- workDir)
            (TimeSpan.FromMinutes 2.)

    for msg in res.Messages do
        printfn "%s" msg

    if res.ExitCode <> 0 then
        failwith
        <| sprintf "Client code didn't pass:\n %s"
                   (res.Errors |> String.concat "\n")

Target "BuildClient" <| fun _ -> runClient build

Target "ClientTests" <| fun _ -> runClient runtests
