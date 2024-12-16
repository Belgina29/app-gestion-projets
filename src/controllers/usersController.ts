import { Request, Response } from "express";
import { pool } from "../database";

// Create user
export const createUser = async (req: Request, res: Response) => {
  const { id, username, email, password_hash, role } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (id, username, email, password_hash, role) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, username, email, password_hash, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Server error");
  }
};

// Get users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Server error");
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void>=> {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).send("User not found");
      return 
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Server error");
  }
};

// Update user
export const updateUser = async (req: Request, res: Response):Promise<void> => {
  const { id } = req.params;
  const { username, email, password_hash, role } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users 
       SET username = $1, email = $2, password_hash = $3, role = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 RETURNING *`,
      [username, email, password_hash, role, id]
    );
    if (result.rows.length === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Server error");
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0){
      res.status(404).send("User not found");
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Server error");
  }
};