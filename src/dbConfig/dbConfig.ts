import { error } from "console";
import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URL!);
        const connect = mongoose.connection;
        connect.on('connected',()=>{
            console.log("DB Connection Established Successfully.");
        })
        connect.on('error',(error)=>{
            console.log("Encountered an error while connecting to db" + error);
            process.exit;            
        })
    }
    catch(err){
        console.log("Failed to connect to the DB.");
        console.log(err);
    }
    
}