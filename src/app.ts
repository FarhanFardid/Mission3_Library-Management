import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();


app.use(cors({ origin: true, credentials: true }));


app.use(express.json());


app.get("/", (req:Request, res:Response) => {
  res.send("Library Management Server is running...");
});

export default app;
