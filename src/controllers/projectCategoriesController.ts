import { Request, Response } from "express";
import { pool } from "../database"; 

// 1. Associer une catégorie à un projet
export const addCategoryToProject = async (req: Request, res: Response) => {
  const { project_id, category_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO project_categories (project_id, category_id, created_at) 
       VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *`,
      [project_id, category_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error associating category to project:", error);
    res.status(500).send("Server error");
  }
};

// 2. Retirer une catégorie d'un projet
export const removeCategoryFromProject = async (req: Request, res: Response): Promise<void> => {
  const { project_id, category_id } = req.body;

  try {
    const result = await pool.query(
      `DELETE FROM project_categories 
       WHERE project_id = $1 AND category_id = $2 RETURNING *`,
      [project_id, category_id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Association not found" });
      return 
    }

    res.status(200).json({ message: "Category removed from project successfully" });
  } catch (error) {
    console.error("Error removing category from project:", error);
    res.status(500).send("Server error");
  }
};

// 3. Récupérer toutes les catégories associées à un projet
export const getCategoriesByProjectId = async (req: Request, res: Response) => {
  const { project_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT c.* 
       FROM categories c
       INNER JOIN project_categories pc ON c.id = pc.category_id
       WHERE pc.project_id = $1`,
      [project_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching categories for project:", error);
    res.status(500).send("Server error");
  }
};

// 4. Récupérer tous les projets associés à une catégorie
export const getProjectsByCategoryId = async (req: Request, res: Response) => {
  const { category_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT p.* 
       FROM projects p
       INNER JOIN project_categories pc ON p.id = pc.project_id
       WHERE pc.category_id = $1`,
      [category_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching projects for category:", error);
    res.status(500).send("Server error");
  }
};
