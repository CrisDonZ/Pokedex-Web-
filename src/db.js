import "dotenv/config";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pokedex');
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};
