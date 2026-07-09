import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
let cachedConnection = null;

const connectDB = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
            bufferCommands: false,
        });
        
        cachedConnection = connectionInstance;
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        return cachedConnection;
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        throw error; 
    }
}

export default connectDB;