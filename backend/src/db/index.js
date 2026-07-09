import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

let cachedConnection = null;

const connectDB = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        const connectionURI = `${process.env.MONGODB_URI}/${DB_NAME}`;
        console.log("Attempting to connect to MongoDB..."); 

        const connectionInstance = await mongoose.connect(connectionURI, {
            bufferCommands: false,    
            serverSelectionTimeoutMS: 5000 
        });
        
        cachedConnection = connectionInstance;
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        return cachedConnection;
    } catch (error) {
        console.error("CRITICAL: MONGODB connection FAILED ->", error);
        throw error; 
    }
}

export default connectDB;