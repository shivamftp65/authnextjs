import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export const getDataFromToken = (request: NextRequest) => {
    try{

        const token = request.cookies.get('token')?.value || "";
        if(token === ""){
            throw new Error("No Token Found")
        }

        const decodedToken:any = jwt.verify(token, process.env.TOken_SECRET!);
        console.log("Decoded TOken", decodedToken);
        return decodedToken.id
    } catch(error:any){
        throw new Error(error.message)
    }
}