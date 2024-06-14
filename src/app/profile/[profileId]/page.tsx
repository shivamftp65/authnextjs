import React from "react";

export default function ProPage({params}:any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-900" >
            <h1 className=" text-gray-200 font-bold">Profile Page</h1>
            <h2 className="p-3 bg-green-500 rounded text-black">{params.profileId}</h2>
        </div>
    )
}