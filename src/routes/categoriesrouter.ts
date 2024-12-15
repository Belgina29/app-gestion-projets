import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// CRUD pour les catégories

router.post("/", async (req, res) => {
  const { name } = req.body;
  const category = await prisma.category.create({
    data: { name },
  });
  res.json(category);
});

router.get("/", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

router.put("/:id", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const category = await prisma.category.update({
    where: { id: parseInt(id) },
    data: { name },
  });
  res.json(category);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.delete({
    where: { id: parseInt(id) },
  });
  res.json(category);
});

export default router;
