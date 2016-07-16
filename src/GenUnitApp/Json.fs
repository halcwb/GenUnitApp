namespace GenUnitApp

module Json =

    open System
    open System.IO
    open System.Text
    open Newtonsoft.Json

    open Suave
    open Suave.Operators

    /// 
    let serialize (o: obj) =
       JsonConvert.SerializeObject(o) 

    
    let deSerialize<'T> (s: string) =
        JsonConvert.DeserializeObject<'T>(s)


    let mapJson f =
        request(fun r ->
            f (Encoding.UTF8.GetString(r.rawForm) |> deSerialize)
            |> serialize
            |> Successful.OK
            >=> Writers.setMimeType "application/json")

