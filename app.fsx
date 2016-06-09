//#if BOOTSTRAP
//System.Environment.CurrentDirectory <- __SOURCE_DIRECTORY__
//if not (System.IO.File.Exists "paket.exe") then let url = "https://github.com/fsprojects/Paket/releases/download/2.40.9/paket.exe" in use wc = new System.Net.WebClient() in let tmp = System.IO.Path.GetTempFileName() in wc.DownloadFile(url, tmp); System.IO.File.Move(tmp,System.IO.Path.GetFileName url);;
//#r "paket.exe"
//Paket.Dependencies.Install (System.IO.File.ReadAllText "paket.dependencies")
//#endif

//---------------------------------------------------------------------
#I __SOURCE_DIRECTORY__
#r "packages/FSPowerPack.Core.Community/Lib/Net40/FSharp.PowerPack.dll"
#r "packages/FSPowerPack.Linq.Community/Lib/Net40/FSharp.PowerPack.Linq.dll"
#r "packages/FSPowerPack.Metadata.Community/Lib/Net40/FSharp.PowerPack.Metadata.dll"
#r "packages/FSPowerPack.Parallel.Seq.Community/Lib/Net40/FSharp.PowerPack.Parallel.Seq.dll"
#r "System.Core.dll"
#r "System.dll"
#r "System.Numerics.dll"
#r "packages/Suave/lib/net40/Suave.dll"
//#r "packages/Informedica.GenUtils.Lib/lib/net45/Informedica.GenUtils.Lib.dll"
#r "packages/Informedica.GenUnits.lib/lib/net45/Informedica.GenUnits.lib.dll"

open System
open Suave // always open suave
open Suave.Successful
open Suave.Http
open Suave.Web // for config

//open Informedica.GenUtils.Lib

printfn "initializing script..."

let msg = "Hello"
//    let eq = "200 mg[Mass]/ml[Volume] * 2 ml[Volume]/hour[Time]"
//    let rs = eq |> Api.eval
//    sprintf "This applicaton can calculate this expression:</br> %s = %s" eq rs

let config =
    let port = System.Environment.GetEnvironmentVariable("PORT")
    { defaultConfig with
        logger = Logging.Loggers.saneDefaultsFor Logging.LogLevel.Verbose
        bindings = [ (if port = null then HttpBinding.mkSimple HTTP "127.0.0.1" 3000
                      else HttpBinding.mkSimple HTTP "0.0.0.0" (int32 port)) ] }

printfn "starting webserver ..."

let app = OK msg

startWebServer config app
