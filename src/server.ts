import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");

    app.listen(PORT, () => {
      console.log(`Library Management Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Library Management server:", error);
    process.exit(1);
  }
};

startServer();
