import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByCategory,
} from "../controllers/projectsController";

export const router = Router();

router.get("/", getProjects);  
router.get("/:id", getProjectById);  
router.post("/", createProject);  
router.put("/:id", updateProject);  
router.delete("/:id", deleteProject);  
router.get("/category/:categoryId", getProjectsByCategory);  
