import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

//middleware

app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API");
});

export default app;


