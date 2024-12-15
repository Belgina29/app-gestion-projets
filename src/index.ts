import express, {Request, Response } from "express";
import dotenv from 'dotenv';
import { pool} from './database';

dotenv.config();

const app = express();
//middleware

app.use(express.json());

//routes
/*app.get("/", async (req: Request, res:Response) => {
    res.status(200).send("Hello and welcome to the API");
});*/

app.get("/", async (req, res) => {
    try {
      const result = await pool.query("SELECT NOW()");
      res.json({ message: "API en cours d'exécution !", time: result.rows[0] });
    } catch (err) {
      console.error("Erreur lors de la connexion à la base :", err);
      res.status(500).send("Erreur serveur");
    }
  });

export default app;


