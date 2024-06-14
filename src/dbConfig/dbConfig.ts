import { error, log } from "console";
import mongoose from "mongoose";


export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("MongoDB Connected")
        })

        connection.on('error', (error) => {
            console.log('MongoDb connection error, Please make sure db is up and running' + error)
            process.exit(1)
        })
    } catch(error){
        console.log("Something went wrong in connectiong to DB");
        console.log(error)
        
    }
}