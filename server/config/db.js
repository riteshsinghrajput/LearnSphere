import mongoose from "mongoose";


mongoose.set('strictQuery', false);

const connectToDb = async () => {
    try {
    
        const { connection } = await mongoose.connect(
            process.env.MONGO_URI || `mongodb://127.0.0.1:27017/LearnSphere`, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000,
        }
        )
        if (connection) {
            console.log(`Connected to MongoDB: ${connection.host}`)
        }
    } catch (error) {
        console.log("mongodb connect error ", error);
        process.exit(1);
    }
}

export default connectToDb