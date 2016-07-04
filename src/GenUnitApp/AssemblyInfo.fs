namespace System
open System.Reflection

[<assembly: AssemblyTitleAttribute("GenUnitApp")>]
[<assembly: AssemblyProductAttribute("GenUnitApp")>]
[<assembly: AssemblyCompanyAttribute("halcwb")>]
[<assembly: AssemblyDescriptionAttribute("Client Server App to calculate and convert units")>]
[<assembly: AssemblyVersionAttribute("0.1.0")>]
[<assembly: AssemblyFileVersionAttribute("0.1.0")>]
do ()

module internal AssemblyVersionInformation =
    let [<Literal>] Version = "0.1.0"
    let [<Literal>] InformationalVersion = "0.1.0"
