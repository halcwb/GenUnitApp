namespace GenUnitApp


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
            if grp |> String.isNullOrWhiteSpace then 
                units
                |> List.collect id
                |> List.filter (fun u -> 
                    (u 
                    |> Unit.getGroupName 
                    |> Unit.Name.toString = grp) || (grp |> String.isEmpty))
                |> List.map (fun u -> 
                    let abbr = u.Abbreviation |> fst |> Unit.Name.toString
                    let grp = u.Group |> Unit.Name.toString
                    sprintf "%s[%s]" abbr grp)

            else
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


