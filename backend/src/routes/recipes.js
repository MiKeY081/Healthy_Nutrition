import express from 'express';
import prisma from '../lib/prisma.js'; // Import Prisma client
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        user: {
          select: { username: true },
        },
      },
    });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recipe by id
router.get('/:id', async (req, res) => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create recipe
router.post('/', auth, async (req, res) => {
  try {
    const { title, ingredients, instructions, imageUrl } = req.body;

    const recipe = await prisma.recipe.create({
      data: {
        title,
        ingredients,
        instructions,
        imageUrl,
        userId: req.userId,
      },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update recipe
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, ingredients, instructions, imageUrl } = req.body;

    const recipe = await prisma.recipe.findUnique({
      where: { id: req.params.id },
    });

    if (!recipe || recipe.userId !== req.userId) {
      return res.status(404).json({ message: 'Recipe not found or not authorized' });
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id: req.params.id },
      data: { title, ingredients, instructions, imageUrl },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    res.json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete recipe
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: req.params.id },
    });

    if (!recipe || recipe.userId !== req.userId) {
      return res.status(404).json({ message: 'Recipe not found or not authorized' });
    }

    await prisma.recipe.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export { router as recipeRoutes };
