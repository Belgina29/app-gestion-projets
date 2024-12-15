import express, {Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

//middleware

app.use(express.json());

//routes
app.get("/", (req: Request, res:Response) => {
    res.status(200).send("Hello and welcome to the API");
});

export default app;


