#I "../packages/FAKE/tools/"

#r @"FakeLib.dll"

open System
open System.IO

open Fake

let dir = (new DirectoryInfo(__SOURCE_DIRECTORY__)).Parent.FullName
Environment.CurrentDirectory <- dir
    
let clientPath   = "./client"
let nodeFilePath = "./packages/Node.js/node.exe"
let npmFilePath  = "./packages/Npm/node_modules/npm/bin/npm-cli.js"

/// Default paths to node
let private nodeFileName = 
    match isUnix with
    | true -> ""
    | _    -> nodeFilePath

/// Default paths to Npm
let private npmFileName =
    match isUnix with
    | true -> "/usr/local/bin/npm"
    | _    -> npmFilePath

/// Arguments for the Npm install command
type InstallArgs =
| Standard
| Forced

/// The list of supported Npm commands. The `Custom` alternative
/// can be used for other commands not in the list until they are
/// implemented
type NpmCommand =
| Install of InstallArgs
| Run of string
| Custom of string

/// The Npm parameter type
type NpmParams = 
    { Src: string
      NodeFilePath: string
      NpmFilePath: string
      WorkingDirectory: string
      Command: NpmCommand
      Timeout: TimeSpan }

/// Npm default parameters
let defaultNpmParams = 
    { Src = ""
      NodeFilePath = nodeFileName
      NpmFilePath = npmFileName
      Command = Install Standard
      WorkingDirectory = "."
      Timeout = TimeSpan.MaxValue }

let private parseInstallArgs = function
    | Standard -> ""
    | Forced   -> " --force"

let private parse = function
    | Install installArgs -> sprintf "install%s" (installArgs |> parseInstallArgs)
    | Run str -> sprintf "run %s" str
    | Custom str -> str

let run npmParams =
    let npmPath = Path.GetFullPath(npmParams.NpmFilePath)
    let nodePath = 
        if npmParams.NodeFilePath |> String.IsNullOrEmpty then ""
        else Path.GetFullPath(npmParams.NodeFilePath)
    let fileName = 
        if nodePath |> String.IsNullOrEmpty then npmPath else nodePath
    let arguments = 
        let args = npmParams.Command |> parse
        if nodePath |> String.IsNullOrEmpty then args
        else sprintf "%s %s" npmPath args
    let workingDir = Path.GetFullPath(npmParams.WorkingDirectory)

    let ok = 
        execProcess (fun info ->
            info.FileName <- fileName
            info.WorkingDirectory <- workingDir
            info.Arguments <- arguments) npmParams.Timeout
    if not ok then failwith (sprintf "'npm %s' task failed" arguments)

/// Runs npm with the given modification function. Make sure to have npm installed,
/// you can install npm with nuget or a regular install. To change which `Npm` executable
/// to use you can set the `NpmFilePath` parameter with the `setParams` function.
///
/// ## Parameters
///
///  - `setParams` - Function used to overwrite the Npm default parameters.
///
/// ## Sample
///
///        Target "Web" (fun _ ->
///            Npm (fun p ->
///                   { p with
///                       Command = Install Standard
///                       WorkingDirectory = "./src/FAKESimple.Web/"
///                   })
///
///            Npm (fun p ->
///                   { p with
///                       Command = (Run "build")
///                       WorkingDirectory = "./src/FAKESimple.Web/"
///                   })
///        )
let Npm setParams =
    defaultNpmParams |> setParams |> run


let buildClient () =
    let npmFilePath = environVarOrDefault "NPM_FILE_PATH" defaultNpmParams.NpmFilePath

    Npm <| fun p ->
        { p with
            Command = Install Standard
            WorkingDirectory = clientPath
            NpmFilePath = npmFilePath }

let testClient () =
    let npmFilePath = environVarOrDefault "NPM_FILE_PATH" defaultNpmParams.NpmFilePath
    
    Npm <| fun p ->
        { p with
            Command = Run "jake-tests"
            WorkingDirectory = clientPath 
            NpmFilePath = npmFilePath }


Target "BuildClient" <| fun _ ->  buildClient ()
    

Target "ClientTests" <| fun _ -> testClient ()


