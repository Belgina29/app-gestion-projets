import { Router } from "express";
import {
  addCategoryToProject,
  removeCategoryFromProject,
  getCategoriesByProjectId,
  getProjectsByCategoryId,
} from '../controllers/projectCategoriesController'

export const projectCategoriesRouter = Router();

projectCategoriesRouter.post("/", addCategoryToProject);
projectCategoriesRouter.delete("/", removeCategoryFromProject);
projectCategoriesRouter.get("/project/:project_id", getCategoriesByProjectId);
projectCategoriesRouter.get("/category/:category_id", getProjectsByCategoryId);
