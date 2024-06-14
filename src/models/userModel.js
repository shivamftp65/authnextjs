import { verify } from 'crypto'
import mongoose from 'mongoose'
import { type } from 'os'

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, "Please provide an username"],
        unique: true
    },
    email : {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password : {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified : {
        type: Boolean,
        default: false
    },
    isAdmin : {
        type: Boolean,
        default: false
    },
    forgotPasswordToken : {
        type: String
    },
    forgotPasswordExpiry : Date,
    verifyToken : String,
    veryfyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User


