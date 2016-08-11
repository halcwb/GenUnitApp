#load "load-project-release.fsx"

#time

open System

Environment.CurrentDirectory <- __SOURCE_DIRECTORY__



module GenUnits =
    
    module Api =

        open Informedica.GenUtils.Lib.BCL
        open Informedica.GenUnits.Lib
        open Informedica.GenUnits.Lib.Unit.Units

        module CU = CombiUnit
        module VU = ValueUnit
        module UG = UnitGroup    

        let fromString = Api.fromString
        
        let toString = Api.toString
        
        let eval = Api.eval
        
        let convert = Api.convert
        
        let getUnits grp = 
            grp
            |> String.split "/"
            |> List.map UG.fromString
            |> List.reduce (/)
            |> UG.getUnits
            |> List.map CU.toString

        let groups =
            units
            |> List.collect (fun ul ->
                ul |> List.map (fun u -> u.Group |> Unit.Name.toString)
            )



