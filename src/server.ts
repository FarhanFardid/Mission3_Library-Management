import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";

let server:Server;
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");

    server = app.listen(PORT, () => {
      console.log(`Library Management Server is up and running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Library Management server:", error);
    process.exit(1);
  }
};

startServer();
