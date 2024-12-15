import { Pool }  from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

pool.on("connect", () => {
    console.log("Connection to PostgreSQL database successful!");
});

pool.on("error", (err) => {
    console.error("Database connection error :", err);
});

process.on("exit", () => {
    pool.end(() => console.log("Closed connection pool"));
});