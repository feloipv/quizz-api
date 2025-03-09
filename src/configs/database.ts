import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI as string;

const options: ConnectOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, options);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

export default connectDB;
