import dotenv from "dotenv";
dotenv.config({ path: './.env' });

import connectDB from "./db/index.js";
import app  from './app.js';

const startServer = async () => {
    try {
        await connectDB();
        console.log("MongoDB connected successfully!");
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server is running smoothly at port : ${PORT}`);
        });

    } catch (error) {
        console.error("Server initialization failed:", error);
        process.exit(1);
    }
};

if (!process.env.VERCEL) {
    startServer();
}