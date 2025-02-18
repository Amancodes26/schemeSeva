import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

const startServer = async () => {
    try {
        await connectDB();
        
        const server = app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });

        // Handle server errors
        server.on('error', (error) => {
            console.error('Server error:', error);
        });

    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();