namespace Informedica.GenUnit.Tests

open Swensen.Unquote
open NUnit.Framework
open FsCheck


[<TestFixture>]
type ``Test that build was succesfull`` () =
    let check = 
        Check.QuickThrowOnFailure >> ignore

    [<Test>]
    member x.``Always pass test`` () = ()


    [<Test>]
    member x.``Unquote is working`` () =
        test <@ 1 = 1 @>

    [<Test>]
    member x.``FsCheck is working`` () =
        fun b -> if b then true else true
        |> check
