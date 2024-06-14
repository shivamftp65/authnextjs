"use client"
import { error } from "console"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Erica_One } from "next/font/google"
import { useRouter } from "next/router"
import Link from "next/link"

export default function VerifyEmail(){

    // const router = useRouter()
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try{
            await axios.post("/api/users/verifyEmail", {token})
            setVerified(true)
            setError(false)
        } catch(error: any){
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        console.log("THis is urltoken", urlToken)
        setToken(urlToken || "")

        // const {query} = router
        // const urlTOkentwo = query.token

    }, [])

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-700">
            <h1 className=" text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token? `${token}` : "No token"}
            </h2>
            {
                verified && (
                    <div>
                        <h2>Verified</h2>
                        <Link href={'/login'} >Login</Link>
                    </div>
                )
            }
            {
                error && (
                    <div>
                        <h2>error</h2>
                    </div>
                )
            }
        </div>
    )
}