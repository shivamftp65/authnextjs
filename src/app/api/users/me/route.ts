import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDataFromToken } from "@/helpers/getDatafromToken";

connect()

export async function POST(request : NextRequest) {
    try{

        // extract data from token
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id : userId}).select("-password")
        // check if there is no user
        return NextResponse.json({
            message: "User Found",
            data: user
        })

    } catch(error:any){
        return NextResponse
        .json(
            {error : error.message},
            {status : 500}
        )
    }
}