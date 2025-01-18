import express from 'express';
import prisma from '../lib/prisma.js'; // Import Prisma client
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all meal plans
router.get('/', async (req, res) => {
  try {
    const mealPlans = await prisma.mealPlan.findMany({
      include: {
        user: {
          select: { username: true },
        },
      },
    });
    res.json(mealPlans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get meal plan by id
router.get('/:id', async (req, res) => {
  try {
    const mealPlan = await prisma.mealPlan.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    res.json(mealPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create meal plan
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, duration, caloriesRange, schedule, imageUrl } = req.body;

    const mealPlan = await prisma.mealPlan.create({
      data: {
        title,
        description,
        duration,
        caloriesRange,
        schedule,
        imageUrl,
        userId: req.userId,
      },
    });

    res.status(201).json(mealPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update meal plan
router.put('/:id', auth, async (req, res) => {
  try {
    const mealPlan = await prisma.mealPlan.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found or not authorized' });
    }

    const updatedMealPlan = await prisma.mealPlan.update({
      where: { id: req.params.id },
      data: req.body, // This will update the fields in the request body
    });

    res.json(updatedMealPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete meal plan
router.delete('/:id', auth, async (req, res) => {
  try {
    const mealPlan = await prisma.mealPlan.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found or not authorized' });
    }

    await prisma.mealPlan.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Meal plan deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export { router as mealPlanRoutes };
