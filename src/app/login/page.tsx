"use client"
import { useEffect, useState } from "react"
import axios from 'axios'
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

function LoginPage(){

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try{
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login Success", response.data);
            router.push("/profile")

        } catch(error: any){
            console.log("Login Failed", error)
            toast.error(error.response)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-900">
            <h1 className="text-white">{loading ? "Processing": "Login"}</h1>

            <label htmlFor="email" className="text-sm font-bold text-gray-200" >Email</label>
            <input 
                type="email" 
                name="email" 
                id="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})} 
                placeholder="email"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-400 font-bold" 
            />

            <label htmlFor="password" className="text-sm font-bold text-gray-200" >password</label>
            <input 
                type="password" 
                name="password" 
                id="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})} 
                placeholder="password"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-400 font-bold" 
            />

            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg focus:outline-none text-yellow-900 font-bold focus:border-gray-600">
                {
                    buttonDisabled ? "No Login" : "Login"
                }
            </button>
            <Link className="text-white" href={'/signup'}>Visit Signup Page</Link>
        </div>
    )
}

export default LoginPage