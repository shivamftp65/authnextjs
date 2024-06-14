"use client"
import React, { useState } from "react"
import axios from "axios"
import Link from "next/link"
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation"


export default function ProfilePage() {

    const router = useRouter()
    const [data, setData] = useState("nothing")

    const getUserDetails = async () => {
        try {
            const res = await axios.post("api/users/me")
            console.log("User data",res.data)
            setData(res.data.data._id)
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const logout = async () => {
        try{
            await axios.get("api/users/logout")
            toast.success("Logout Success")
            router.push("/login")
        } catch(error: any){
            console.log(error.message)
            toast(error.message)
        }
    }
    return (   
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-900">
            <h1 className=" text-gray-300 font-bold">Profile Page</h1>
            <h2 className="text-gray-300 font-bold">
                {
                    data === "nothing" ? "Nothing" : <Link className="border focus:ring-2 " href={`/profile/${data}`}>{data}</Link>
                }
            </h2>
            <hr />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={getUserDetails}>User Details</button>
        </div>
    )
}