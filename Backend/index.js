import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

const startServer = async () => {
    try {
        await connectDB();
        const port = process.env.PORT || 5000;
        
        app.listen(port, () => {
            console.log(`\n✅ Server is running on port: ${port}`);
            console.log(`✅ API is running at: http://localhost:${port}`);
        });
        
    } catch (error) {
        console.error("\n❌ ERROR: Failed to start server", error);
        process.exit(1);
    }
};

startServer();