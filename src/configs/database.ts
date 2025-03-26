import mongoose, { ConnectOptions } from "mongoose";

const options: ConnectOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

const connectDB = async (mongodb_uri: string) => {
  try {
    await mongoose.connect(mongodb_uri, options);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

export default connectDB;
