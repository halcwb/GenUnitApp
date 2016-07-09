namespace GenUnitApp.Utils

module Path = 

    open System
    open System.IO

    /// combine path `p1` with `p2`
    let combineWith p2 p1 = Path.Combine(p1, p2)

    /// Create a `DirectoryInfo` from `p` 
    let dir p = new DirectoryInfo(p)

    /// Check whether directory `p` exists
    let dirExists p =
        let d = (new DirectoryInfo(p))
        d.Exists

    /// Get the parent directory from `p`
    let parentDirectory p = 
        let d = (new DirectoryInfo(p))
        d.Parent.FullName
    
module Json =

    open Newtonsoft

//    let toString (o: obj) =
//       JsonConvert.SerializeObject(o) 
//
//
//    let fromString<'T> (s: string) =
//        JsonConvert.DeserializeObject<'T>(s)



