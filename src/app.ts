import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import bookRoutes from './app/routes/bookRoutes';
import borrowRoutes from './app/routes/borrowRoutes';
dotenv.config();

const app: Application = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://minimal-library-farhanfardids-projects.vercel.app']
   }));
app.use(express.json());


app.get("/", (req:Request, res:Response) => {
  res.send("Library Management Server is Up and Running...");
});

app.use('/api/books', bookRoutes); 
app.use('/api/borrow', borrowRoutes); 
app.use(globalErrorHandler);

export default app;
