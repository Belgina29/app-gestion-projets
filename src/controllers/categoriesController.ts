import { Request, Response } from "express";
import { pool } from "../database";

// get categories
export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const { rows } = await pool.query("SELECT * FROM categories");
        res.status(200).json(rows);
    } catch (err) {
        console.error("Error retrieving categories:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Create category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO categories (name, created_at, updated_at) VALUES ($1, NOW(), NOW()) RETURNING *",
            [name]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating category :", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Update category
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const result = await pool.query(
            "UPDATE categories SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
            [name, id]
        );
        if (result.rowCount === 0) {
            res.status(404).json({ message: "Catégorie not found" });
            return;
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("Error updating category:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete category
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM categories WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: "Catégorie not found" });
            return;
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        console.error("Error deleting category :", err);
        res.status(500).json({ message: "Server error" });
    }
};
