import { Request, Response } from "express";
import { pool } from "../database";

// Create project
export const createProject = async (req: Request, res: Response) => {
  const { title, description, start_date, end_date, status, user_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO projects (title, description, start_date, end_date, status, user_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, start_date, end_date, status, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating project :", error);
    res.status(500).send("Server error");
  }
};

// Get all projects
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM projects");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving projects:", error);
    res.status(500).send("Server error");
  }
};

//Get projects by ID
export const getProjectById = async (req: Request, res: Response):Promise <void> => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).send("Project not found");
      return ;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error retrieving project :", error);
    res.status(500).send("Server error");
  }
};

// Update project 
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, start_date, end_date, status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE projects
      SET title = $1, description = $2, start_date = $3, end_date = $4, status = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6 RETURNING *`,
      [title, description, start_date, end_date, status, id]
    );
    if (result.rows.length === 0) {
      res.status(404).send("Project not found");
      return ;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).send("Server error");
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM projects WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      res.status(404).send("Project not found");
      return;
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project :", error);
    res.status(500).send("Server error");
  }
};

// Filter a project
export const getProjectsByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  try {
    const result = await pool.query(
      `SELECT p.*
      FROM projects p
      JOIN project_categories pc ON p.id = pc.project_id
      WHERE pc.category_id = $1`,
      [categoryId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving projects by category :", error);
    res.status(500).send("Server error ");
  }
};