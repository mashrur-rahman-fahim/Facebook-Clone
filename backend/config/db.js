import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const cnn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${cnn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
