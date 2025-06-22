import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

dotenv.config();

const app: Application = express();


app.use(cors({ origin: true, credentials: true }));

app.use(express.json());


app.get("/", (req:Request, res:Response) => {
  res.send("Library Management Server is up and running...");
});

app.use(globalErrorHandler);

export default app;
