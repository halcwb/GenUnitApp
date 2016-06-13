// --------------------------------------------------------------------------------------
// FAKE build script
// --------------------------------------------------------------------------------------
System.Environment.CurrentDirectory <- __SOURCE_DIRECTORY__

#load "paket-files/halcwb/GenBuild/scripts/targets.fsx"

open System

open Fake
open Fake.NpmHelper
#if MONO
#else
open SourceLink
#endif


let clientPath = "./client"

Target "ClientTests" <| fun _ ->
    let npmFilePath = environVarOrDefault "NPM_FILE_PATH" defaultNpmParams.NpmFilePath
    Npm <| fun p ->
        { p with
            Command = Install Standard
            WorkingDirectory = clientPath
            NpmFilePath = npmFilePath }
    
    Npm <| fun p ->
        { p with
            Command = Run "jake-tests"
            WorkingDirectory = clientPath 
            NpmFilePath = npmFilePath }


Target "All" DoNothing


"Clean"
  ==> "AssemblyInfo"
  ==> "Build"
  ==> "CopyBinaries"
  ==> "ClientTests"
  ==> "RunTests"
  ==> "GenerateReferenceDocs"
  ==> "GenerateDocs"
  ==> "All"
  =?> ("ReleaseDocs",isLocalBuild)

"All" 
#if MONO
#else
  =?> ("SourceLink", Pdbstr.tryFind().IsSome )
#endif
  ==> "NuGet"
  ==> "BuildPackage"

"CleanDocs"
  ==> "GenerateHelp"
  ==> "GenerateReferenceDocs"
  ==> "GenerateDocs"

"CleanDocs"
  ==> "GenerateHelpDebug"

"GenerateHelp"
  ==> "KeepRunning"
    
"ReleaseDocs"
  ==> "Release"

"BuildPackage"
  ==> "PublishNuget"
  ==> "Release"


RunTargetOrDefault "All"
