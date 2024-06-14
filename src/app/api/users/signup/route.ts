import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try{

        const reqBody = await request.json()
        const {username, email, password} = reqBody
        // Validation
        console.log(reqBody);

        const user = await User.findOne({email: email})
        if(user){
            return NextResponse
            .json(
                {error : "User already exists"},
                {status : 400}
            )
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email, 
            password: hashedPassword
        })

        const saved_user = await newUser.save()
        console.log(saved_user);

        const userId = saved_user._id
        // send verification email
        await sendEmail({email, emailType: "VERIFY", userId:userId})

        return NextResponse
        .json({
            message: "User Registered Successfully",
            success: true,
            saved_user
        })


    } catch(error:any){
        return NextResponse
        .json(
            {error : error.message},
            {status : 500}
        )
    }
}