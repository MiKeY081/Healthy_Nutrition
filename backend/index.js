import express from 'express';
import { recipeRoutes } from './src/routes/recipes.js';
import { postRoutes } from './src/routes/posts.js';
import { authRoutes } from './src/routes/auth.js';
import { mealPlanRoutes } from './src/routes/mealPlans.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());  // Parse JSON bodies

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', authRoutes);
app.use('/api/meal', mealPlanRoutes);

// Default route for testing
app.get('/', (req, res) => {
  res.send('Healthy Eating API is running...');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
