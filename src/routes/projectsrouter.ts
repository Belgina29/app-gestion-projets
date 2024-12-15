import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// CRUD pour les projets

router.post("/", async (req, res) => {
  const { name, description, categoryIds } = req.body;
  const project = await prisma.project.create({
    data: {
      name,
      description,
      categories: {
        connect: categoryIds.map((id: number) => ({ id })),
      },
    },
  });
  res.json(project);
});

router.get("/", async (req, res) => {
  const projects = await prisma.project.findMany({
    include: {
      categories: true,
    },
  });
  res.json(projects);
});

router.put("/:id", async (req, res) => {
  const { name, description, categoryIds } = req.body;
  const { id } = req.params;
  const project = await prisma.project.update({
    where: { id: parseInt(id) },
    data: {
      name,
      description,
      categories: {
        set: categoryIds.map((id: number) => ({ id })),
      },
    },
  });
  res.json(project);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const project = await prisma.project.delete({
    where: { id: parseInt(id) },
  });
  res.json(project);
});

export default router;
