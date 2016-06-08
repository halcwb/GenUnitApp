#load "load-project-release.fsx"

#time

open Informedica.GenUtils.Lib
open Informedica.GenCore.Lib

open System

open Suave

startWebServer defaultConfig (Successful.OK "Hello World")
